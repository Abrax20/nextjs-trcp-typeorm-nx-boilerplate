import { Request, Response } from 'express';
import pick from 'lodash/pick';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { v4 as uuid } from 'uuid';

import { env } from '../../../../env.mjs';

/* eslint-disable no-param-reassign */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const errorSerializer = (error: any) => {
  if (error?.parameters) error.parameters = undefined;
  if (error?.parent?.parameters) error.parent.parameters = undefined;
  if (error?.original?.parameters) error.original.parameters = undefined;
  return error;
};

const requestSerializer = (request: Request) => {
  if (env.DEBUG === 'true') return request;
  request.headers = pick(request.headers, [
    'connection',
    'host',
    'origin',
    'x-real-ip',
    'x-forwarded-for',
    'x-forwarded-proto',
    'x-forwarded-host',
    'x-forwarded-port',
    'x-scheme',
    'user-agent',
    'content-type',
    'accept',
    'referer',
    'accept-encoding',
    'ssl-client-subject-dn',
  ]);
  return request;
};

const responseSerializer = (response: Response) => {
  if (env.DEBUG === 'true') return response;
  response.headers = pick(response.headers, ['content-type', 'content-length']);
  return response;
};
/* eslint-enable no-param-reassign */

const customMessage = (request: Request, response: Response) => {
  const {
    req: { method, originalUrl },
    statusCode,
  } = response;
  return `${statusCode} ${method} ${originalUrl}`;
};

const defaultHttpLogLevel = env.DEFAULT_HTTP_LOG_LEVEL || 'trace';
const logger = pino({ level: env.LOG_LEVEL || 'info' });

export const httpLogger = pinoHttp({
  // @ts-ignore logger can't find
  logger,
  serializers: {
    req: requestSerializer,
    res: responseSerializer,
    err: errorSerializer,
  },
  customLogLevel: (request: Request, response: Response, error: Error) => {
    if (response.statusCode >= 400 && response.statusCode < 500) return 'warn';
    if (response.statusCode >= 500 || error) return 'error';
    return defaultHttpLogLevel;
  },
  customErrorMessage: customMessage,
  customSuccessMessage: customMessage,
  genReqId: () => uuid(),
});

export default logger;
