import { unauthorized } from '@hapi/boom';

import { env } from '../../../../env.mjs';

export function requireInternalToken(request, response, next) {
  if (env.INTERNAL_TOKEN !== (request.query.token || request.body.token)) {
    throw unauthorized('invalid internal token');
  }

  next();
}
