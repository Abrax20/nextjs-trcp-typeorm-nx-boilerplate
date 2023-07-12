import { TRPCError } from '@trpc/server';

import { createTRPCRouter, protectedProcedure } from '../trpc';

import { getExampleDTO } from './example.helper';
import { getExampleSchema } from './example.schema';

export const exampleRouter = createTRPCRouter({
  getExample: protectedProcedure
    .input(getExampleSchema)
    .query(async ({ input: { welcome }, ctx }) => {
      console.log('Welcome:' + welcome);

      if (!welcome) {
        throw new TRPCError({ code: 'BAD_REQUEST' });
      }

      return getExampleDTO();
    }),
});
