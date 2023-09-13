import 'reflect-metadata';

import { config } from 'dotenv';
import * as process from 'process';
import { DataSource } from 'typeorm';

import { Entities } from './entity';
import { getMigrations } from './migrations';

config();
export const appDataSource = new DataSource({
  type: 'postgres',
  migrationsTableName: 'Migrations',
  host: process.env.DATABASE_HOST || 'database',
  username: process.env.DATABASE_USERNAME || 'reachout',
  password: process.env.DATABASE_PASSWORD || 'reachout',
  database: process.env.DATABASE_DATABASE || 'reachout',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  logging: ['error'],
  subscribers: [],
  // TODO: Off in prod
  synchronize: true,
  entities: Entities,
  migrations: getMigrations(),

  ...(process.env.DATABASE_REJECT_UNAUTHORIZED === 'false'
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});
