import { zod } from '@sprindt/generic';

export const getExampleSchema = zod.object({
  welcome: zod.boolean(),
});
