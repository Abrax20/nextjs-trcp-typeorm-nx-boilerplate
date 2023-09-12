import { DataSource } from 'typeorm';

import { Entities } from '../entity';

export type DatabaseConnection = {
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
};

/*
  ...(!config.get('backend.rejectUnauthorized')
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
 */

// eslint-disable-next-line import/no-mutable-exports
export let AppDataSource: DataSource;

export function getDataSource(): DataSource {
  return AppDataSource;
}

export async function connectDatabase(
  connection: DatabaseConnection,
  extraEntities: any[] = []
) {
  AppDataSource = new DataSource({
    type: 'postgres',

    // Connections
    ...connection,

    logging: false,
    migrations: [],
    subscribers: [],
    synchronize: false,

    // Models
    entities: [...Entities, ...extraEntities],
  });
  await AppDataSource.initialize();
  return AppDataSource;
}
