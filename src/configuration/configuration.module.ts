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
      // validationSchema: Joi.object({
      //   NODE_ENV: Joi.string()
      //     .valid('development', 'production', 'test', 'provision')
      //     .default('development'),
      //   PORT: Joi.number().port().default(3010),
      //   NEST_DEBUG: Joi.boolean().default(false),

      //   // Database
      //   DB_HOST: Joi.string().default('localhost'),
      //   DB_PORT: Joi.number().port().default(5510),
      //   DB_USERNAME: Joi.string().default('postgres'),
      //   DB_PASSWORD: Joi.string().default('root'),
      //   DB_NAME: Joi.string().default('postgres'),
      //   DB_SCHEMA: Joi.string().default('public'),
      //   DB_LOGGING: Joi.boolean().default(true),

      //   // GraphQL
      //   GRAPHQL_SERVER: Joi.string()
      //     .valid('production', 'development')
      //     .default('development'),

      //   // Redis
      //   REDIS_HOST: Joi.string().default('localhost'),
      //   REDIS_PORT: Joi.number().port().default(6379),

      //   // JWT
      //   JWT_SECRET: Joi.string().default('secret'),
      //   JWT_EXPIRES_IN: Joi.string().default('100d'),

      //   // GitHub
      //   GITHUB_TOKEN: Joi.string().default(''),

      //   // Test
      //   TEST_TOKEN: Joi.string().default(''),
      // }),
      // validationOptions: {
      //   allowUnknown: false,
      //   abortEarly: false,
      //   debug: true,
      // },
    }),
  ],
})
export class ConfigurationModule {}
