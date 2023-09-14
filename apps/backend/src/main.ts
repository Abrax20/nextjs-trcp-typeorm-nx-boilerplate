import 'reflect-metadata';

import { connectDatabase } from '@sprindt/database';
import http from 'http';

import { env } from '../../../env.mjs';

import { configureApp, configureHealthChecks } from './app';
import { registerHooks, registerShutdownHandler } from './utils/lifecycle';
import logger from './utils/logger';
import client from './utils/metrics';

let server: http.Server;
let healthCheckServer: http.Server;

const startHTTPServer = async () => {
  logger.info('starting http server');

  healthCheckServer = http.createServer(configureHealthChecks());
  healthCheckServer.listen(env.HEALTH_CHECK_PORT);

  await new Promise<void>((resolve, reject) => {
    healthCheckServer.on('listening', () => {
      logger.info(`health check server listening on ${env.HEALTH_CHECK_PORT}`);
      resolve();
    });
    healthCheckServer.on('error', (error) => {
      logger.error(error, `could not start health check server`);
      reject();
    });
  });

  server = http.createServer(configureApp());
  server.listen(env.BACKEND_PORT || 8080);

  await new Promise<void>((resolve) => {
    server.on('listening', () => {
      logger.info(`http server listening on ${env.PORT}`);
      resolve();
    });
  });
};

const stopHTTPServer = async () => {
  logger.info('stopping http server');

  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) return reject(error);
      logger.info('http server stopped');
      return resolve();
    });
  });

  await new Promise<void>((resolve, reject) => {
    healthCheckServer.close((error) => {
      if (error) return reject(error);
      logger.info('health check server stopped');
      return resolve();
    });
  });
};

const main = async () => {
  logger.info(
    `running with PID ${process.pid} in ${process.env.NODE_ENV} mode`
  );
  registerHooks();
  client.collectDefaultMetrics();
  await connectDatabase({
    host: env.DATABASE_HOST,
    database: env.DATABASE_NAME,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    port: parseInt(env.DATABASE_PORT, 10),
  });

  logger.info(
    `connected to "${env.DATABASE_HOST}:${env.DATABASE_PORT}" database`
  );

  await startHTTPServer();
  registerShutdownHandler(stopHTTPServer);
};

main();
