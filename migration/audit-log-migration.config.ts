import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { getAuditLogDataSourceOptions } from '../src/common/data-source-options';
import { EnvironmentEnum } from '../src/configuration/environment.enum';

dotenv.config();

export const auditLogDataSource = new DataSource({
  ...getAuditLogDataSourceOptions(),
  entities: [
    process.env.NODE_ENV === EnvironmentEnum.PRODUCTION
      ? 'dist/src/**/*.audit-log-entity.js'
      : 'src/**/*.audit-log-entity.ts',
  ],
});
