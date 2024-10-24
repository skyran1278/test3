import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { getDataSourceOptions } from '../common/data-source-options';
import { EnvironmentEnum } from '../configuration/environment.enum';

dotenv.config();

export const appDataSource = new DataSource({
  ...getDataSourceOptions(),
  entities: [
    process.env.NODE_ENV === EnvironmentEnum.PRODUCTION
      ? 'dist/**/*.entity.js'
      : 'src/**/*.entity.ts',
  ],
});
