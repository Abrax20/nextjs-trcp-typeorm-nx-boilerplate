import { unauthorized } from '@hapi/boom';
import { zod } from '@example/generic';

import { env } from '../../../../env.mjs';

export async function requireAdminToken(request, response, next) {
  try {
    await zod.string().parseAsync(request.query.token);
  } catch {
    throw unauthorized();
  }

  if (env.ADMIN_TOKEN !== request.query.token) {
    throw unauthorized();
  }

  next();
}
