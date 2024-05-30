import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from './configuration.validation';

/**
 * @see https://docs.nestjs.com/techniques/configuration#schema-validation
 * @see https://github.com/nestjs/config/issues/618#issuecomment-933438918
 * because of the issue above, we are using the class validator validate function, not joi schema
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      validate,
    }),
  ],
})
export class ConfigurationModule {}
