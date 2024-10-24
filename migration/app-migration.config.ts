import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { getDataSourceOptions } from '../src/common/data-source-options';
import { EnvironmentEnum } from '../src/configuration/environment.enum';

dotenv.config();

export const appDataSource = new DataSource({
  ...getDataSourceOptions(),
  entities: [
    process.env.NODE_ENV === EnvironmentEnum.PRODUCTION
      ? 'dist/src/**/*.entity.js'
      : 'src/**/*.entity.ts',
  ],
});
