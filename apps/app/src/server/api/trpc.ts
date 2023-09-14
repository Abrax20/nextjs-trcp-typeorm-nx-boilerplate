/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from '@clerk/nextjs/server';
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { Organization } from '@sprindt/database';
import { initTRPC, TRPCError } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { initDatabase } from '../../database';

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type CreateContextOptions = {
  auth: SignedInAuthObject | SignedOutAuthObject;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerTRPCContext = ({ auth }: CreateContextOptions) => {
  return {
    auth,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async ({
  req,
  res,
}: CreateNextContextOptions) => {
  // Get the session from the server using the getServerSession wrapper function
  const auth = getAuth(req);

  return createInnerTRPCContext({
    auth,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

const requireOrganization = t.middleware(async ({ next, ctx, ...props }) => {
  const auth = ctx.auth as SignedInAuthObject;
  if (!auth.orgId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  let organisation = await Organization.findOne({
    where: { orgId: auth.orgId },
  });

  if (!organisation) {
    const data = await clerkClient.organizations.getOrganization({
      organizationId: auth.orgId,
    });
    organisation = Organization.create({
      orgId: auth.orgId,
      name: data.name || 'Unknown',
    }) as Organization;
    await organisation.save();
  }

  return next({
    ctx: {
      ...ctx,
      organisation,
      orgId: auth.orgId,
    },
  });
});

const requireUser = t.middleware(async ({ next, ctx, ...props }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

const requireDatabase = t.middleware(async ({ next, ctx, ...props }) => {
  try {
    await initDatabase();
    return next({
      ctx,
    });
  } catch (error) {
    console.log(error);
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }
});

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure
  .use(requireUser)
  .use(requireDatabase)
  .use(requireOrganization);
