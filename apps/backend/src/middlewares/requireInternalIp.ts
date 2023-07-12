import { forbidden } from '@hapi/boom';
import type { RequestHandler } from 'express';

import { isInternalIp } from '../utils/ipChecks';

export const requireInternalIp: RequestHandler = (request, response, next) => {
  if (!isInternalIp(request.ip)) {
    throw forbidden('Request did not come from an internal IP address.');
  }
  return next();
};
