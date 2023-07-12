import { NextFunction } from 'express';

export function waitForMiddleware(
  middleware,
  request,
  response
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      middleware(request, response, () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function combineMiddlewares(
  middlewares
): (request: never, response: never, next: NextFunction) => Promise<void> {
  return async (request, response, next) => {
    for (const middleware of middlewares) {
      await waitForMiddleware(middleware, request, response);
    }

    next();
  };
}
