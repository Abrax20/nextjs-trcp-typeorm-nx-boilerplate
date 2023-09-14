import { connectDatabase } from '@sprindt/database';
import { DataSource } from 'typeorm';

import { env } from '../../../env.mjs';

export let database: DataSource;

export async function initDatabase() {
  if (!database?.isInitialized) {
    database = await connectDatabase({
      host: env.DATABASE_HOST,
      database: env.DATABASE_NAME,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      port: parseInt(env.DATABASE_PORT || '5432', 10),
    });
  }
}
