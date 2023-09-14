import 'reflect-metadata';

import { connectDatabase } from '@sprindt/database';
import { Queue, Worker } from 'bullmq';

import { env } from '../../../env.mjs';

import { redis } from './constants';
import logger from './utils/logger';

async function processor(job) {
  logger.info({ job: job.asJSON() }, `Work on new job ${job.id}.`);

  switch (job.name) {
    default: {
      throw new Error(`Unknown job name ${job.name}`);
    }
  }

  throw new Error(`Unknown job name ${job.name}`);
}

async function main() {
  await connectDatabase({
    host: env.DATABASE_HOST,
    database: env.DATABASE_NAME,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    port: parseInt(env.DATABASE_PORT, 10),
  }).catch((err) => console.log(err));
  logger.info(
    `connected to "${env.DATABASE_HOST}:${env.DATABASE_PORT}" database`
  );

  const queue = new Queue('example', { connection: redis });
  const worker = new Worker(queue.name, processor, {
    concurrency: 300,
    connection: redis,
  });

  worker.on('completed', (job) => {
    logger.info(
      { job: job.asJSON() },
      `Contacts worker finished a job ${job.id}.`
    );
  });

  worker.on('failed', (job, error) => {
    logger.info({ job, error }, 'Contacts worker failed on a job.');
  });

  logger.info({ event: 'booted' }, 'Contacts worker started successfully.');
}

main();
