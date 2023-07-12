import { authMiddleware } from '@clerk/nextjs/server';

import { env } from '../../../env.mjs';

export default authMiddleware({
  // debug: true,
  secretKey: env.CLERK_SECRET_KEY,
  signInUrl: env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  publishableKey: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  afterAuth: (req, res, next) => {},
  publicRoutes: [
    '/sign-up(.*)',
    '/sign-in(.*)',
    '/(api|trpc)(.*)',
    '/((?!.*\\..*|_next).*)',
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
};
