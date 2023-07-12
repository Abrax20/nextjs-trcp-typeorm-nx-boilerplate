import { Boom, boomify, isBoom } from '@hapi/boom';
import {
  ErrorRequestHandler,
  Request,
  RequestHandler,
  Response,
} from 'express';
import status from 'http-status';

import { env } from '../../../../env.mjs';

export const handle404: RequestHandler = (request, response) =>
  response.sendStatus(status.NOT_FOUND);

const handleBoomError = (
  boomError: Boom,
  request: Request<unknown>,
  response: Response
): void => {
  // @ts-ignore
  response.err = boomError;

  const payload = { ...boomError.output.payload };
  if (boomError.data) {
    payload.data = boomError.data;
  }

  if (env.DEBUG === 'true') {
    payload.stack = boomError.stack;
  }

  response.status(boomError.output.statusCode).send(payload);
};

export const handleError: ErrorRequestHandler<unknown> = async (
  error,
  request,
  response,
  _next
) => {
  // @ts-ignore
  response.err = error;

  return handleBoomError(
    isBoom(error) ? error : boomify(error),
    request,
    response
  );
};
