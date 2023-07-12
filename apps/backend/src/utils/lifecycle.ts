import moment from 'moment';

import { env } from '../../../../env.mjs';

import logger from './logger';
import { sleep } from './sleep';

export const state = {
  isShuttingDown: false,
};

const SHUTDOWN_DELAY = moment.duration(env.SHUTDOWN_DELAY, 'seconds');
export const shutdownHandlers: Array<() => void> = [];

export const gracefulShutdown = async (isImmediate = false): Promise<void> => {
  if (state.isShuttingDown) return;
  state.isShuttingDown = true;

  if (!isImmediate) {
    logger.info(`shutting down in ${SHUTDOWN_DELAY.as('seconds')}s.`);
    await sleep(SHUTDOWN_DELAY.as('milliseconds'));
  }

  logger.info('starting shutdown');
  for (const shutdownHandler of shutdownHandlers) {
    await shutdownHandler();
  }
  logger.info('shutdown complete');
};

const sigtermHandler = () => {
  logger.info('SIGTERM received.');
  gracefulShutdown();
  process.exit(0);
};

export const unhandledRejectionHandler = (error: unknown): void => {
  logger.error(error as Error, 'unhandledRejection');
  process.exit(1);
};

export const uncaughtExceptionHandler = (error: unknown): void => {
  logger.error(error as Error, 'uncaughtException');
  process.exit(1);
};

export const registerShutdownHandler = (shutdownHandler: () => void): void => {
  shutdownHandlers.push(shutdownHandler);
};

export const registerHooks = (): void => {
  process.on('SIGTERM', sigtermHandler);
  process.on('uncaughtException', uncaughtExceptionHandler);
  process.on('unhandledRejection', unhandledRejectionHandler);
};
