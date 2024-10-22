import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configurationValidate } from './configuration.validation';
import { TypedConfigService } from './typed-config.service';

/**
 * @see https://docs.nestjs.com/techniques/configuration#schema-validation
 * @see https://github.com/nestjs/config/issues/618#issuecomment-933438918
 * because of the issue above, we are using the class validator validate function, not joi schema
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: configurationValidate,
    }),
  ],
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class ConfigurationModule {}
