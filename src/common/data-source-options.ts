import { readFileSync } from 'fs';

import { DataSourceOptions } from 'typeorm';

import { EnvironmentEnum } from '../configuration/environment.enum';

/**
 * for delayed populate process.env, we need to use function
 * @returns
 */
export const getDataSourceOptions = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  migrations: [
    process.env.NODE_ENV === EnvironmentEnum.PRODUCTION
      ? 'dist/migration/app/*.js'
      : 'migration/app/*.ts',
  ],

  // https://github.com/brianc/node-postgres/issues/2558#issuecomment-1765441660
  ssl: process.env.DB_SSL
    ? {
        ca: readFileSync('ap-northeast-1-bundle.pem').toString(),
      }
    : false,
});

export const getAuditLogDataSourceOptions = (): DataSourceOptions => ({
  name: 'audit-log',

  type: 'postgres',
  host: process.env.AUDIT_LOG_DB_HOST,
  port: Number(process.env.AUDIT_LOG_DB_PORT),
  username: process.env.AUDIT_LOG_DB_USERNAME,
  password: process.env.AUDIT_LOG_DB_PASSWORD,
  database: process.env.AUDIT_LOG_DB_NAME,
  schema: process.env.AUDIT_LOG_DB_SCHEMA,
  migrations: [
    process.env.NODE_ENV === EnvironmentEnum.PRODUCTION
      ? 'dist/migration/audit-log/*.js'
      : 'migration/audit-log/*.ts',
  ],

  // https://github.com/brianc/node-postgres/issues/2558#issuecomment-1765441660
  ssl: process.env.DB_SSL
    ? {
        ca: readFileSync('ap-northeast-1-bundle.pem').toString(),
      }
    : false,
});
