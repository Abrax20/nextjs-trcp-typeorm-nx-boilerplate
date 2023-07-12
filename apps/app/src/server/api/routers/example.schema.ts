import { zod } from '@example/generic';

export const getExampleSchema = zod.object({
  welcome: zod.boolean(),
});
