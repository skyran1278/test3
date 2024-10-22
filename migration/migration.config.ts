import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { dataSourceOptions } from '../src/common/data-source-options';

dotenv.config();

export const AppDataSource = new DataSource({
  ...dataSourceOptions(),
  entities: ['dist/src/**/*.entity.js'],
});
