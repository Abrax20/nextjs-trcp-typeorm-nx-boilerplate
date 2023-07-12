import { forbidden } from '@hapi/boom';
import type { RequestHandler } from 'express';

import { isAllowedIp, isBlockedIp } from '../utils/ipChecks';

export const requireNonBlockedIp: RequestHandler = async (
  request,
  response,
  next
) => {
  const isBlocked = await isBlockedIp(request.ip);
  if (!isBlocked) {
    return next();
  }
  const isAllowed = await isAllowedIp(request.ip);
  if (isAllowed) {
    return next();
  }
  throw forbidden(
    'Your IP address is blocked. Please contact hello@luca-app.de if you believe this is a mistake.'
  );
};
