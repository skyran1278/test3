import { readFileSync } from 'fs';

import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: process.env.CI ? '.env.test' : '.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/migration/migrations/*.js'],
  ssl: process.env.DB_SSL
    ? {
        ca: readFileSync('ap-northeast-1-bundle.pem').toString(),
      }
    : false,
});
