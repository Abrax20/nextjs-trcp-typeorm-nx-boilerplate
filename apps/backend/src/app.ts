import 'express-async-errors';

import express, { Application, Router } from 'express';
import helmet from 'helmet';

import { env } from '../../../env.mjs';

// Middlewares
import * as error from './middlewares/errors';
import { etagMiddleware } from './middlewares/etag';
import requestMetricsMiddleware from './middlewares/requestMetric';
import healthRouter from './routes/health';
import internalRouter from './routes/internal';
import managerRouter from './routes/manager';
// Routes
import v1Router from './routes/v1';
import { httpLogger } from './utils/logger';

let app: Application | undefined;

const getApp = (): Application => {
  return app as Application;
};

const configureHealthChecks = (): Application => {
  const healthCheckApp = express();
  healthCheckApp.use(httpLogger);
  healthCheckApp.use(requestMetricsMiddleware);

  healthCheckApp.use('/health', healthRouter);

  return healthCheckApp;
};

const configureApp = (): Application => {
  app = express();
  const router: Router = express.Router();

  app.disable('x-powered-by');
  app.disable('etag');
  app.enable('strict routing');

  app.set('trust proxy', env.TRUST_PROXY);

  // Global Middlewares
  app.use(httpLogger);

  if (env.DEBUG === 'false') {
    app.use(helmet.hsts());
  }

  app.use(requestMetricsMiddleware);
  app.use(etagMiddleware);

  router.use('/v1', v1Router);
  router.use('/manager', managerRouter);
  router.use('/internal', internalRouter);

  app.use('/external/api', router);
  app.use(error.handle404);
  app.use(error.handleError);

  return app;
};

export { configureApp, configureHealthChecks, getApp };
