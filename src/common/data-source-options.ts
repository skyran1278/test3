import { readFileSync } from 'fs';

import { DataSourceOptions } from 'typeorm';

/**
 * for delayed populate process.env, we need to use function
 * @returns
 */
export const dataSourceOptions = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  migrations: ['dist/migration/migrations/*.js'],

  // https://github.com/brianc/node-postgres/issues/2558#issuecomment-1765441660
  ssl: process.env.DB_SSL
    ? {
        ca: readFileSync('ap-northeast-1-bundle.pem').toString(),
      }
    : false,
});
