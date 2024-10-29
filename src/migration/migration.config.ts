import { join } from 'path';

import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { getDataSourceOptions } from '../common/data-source-options';

dotenv.config();

export const appDataSource = new DataSource({
  ...getDataSourceOptions(),
  entities: [join(__dirname, '../**/*.entity.{ts,js}')],
});
