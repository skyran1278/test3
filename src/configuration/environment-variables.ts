import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';

import { EnvironmentEnum } from './environment.enum';

/**
 * @see https://docs.nestjs.com/techniques/configuration#schema-validation
 * should not use boolean type for environment variables, because nest.js will override process.env the value with the string 'true' or 'false'
 */
export class EnvironmentVariables {
  @IsEnum(EnvironmentEnum)
  NODE_ENV!: EnvironmentEnum;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT!: number;

  @IsString()
  CORS_ORIGIN!: string;

  @IsString()
  NEST_DEBUG!: string;

  @IsString()
  DB_HOST!: string;

  @IsNumber()
  DB_PORT!: number;

  @IsString()
  DB_USERNAME!: string;

  @IsString()
  DB_PASSWORD!: string;

  @IsString()
  DB_NAME!: string;

  @IsString()
  DB_SCHEMA!: string;

  @IsString()
  DB_LOGGING!: string;

  @IsString()
  DB_SSL!: string;

  @IsString()
  DB_MIGRATIONS_RUN!: string;

  @IsString()
  AUDIT_LOG_DB_HOST!: string;

  @IsNumber()
  AUDIT_LOG_DB_PORT!: number;

  @IsString()
  AUDIT_LOG_DB_USERNAME!: string;

  @IsString()
  AUDIT_LOG_DB_PASSWORD!: string;

  @IsString()
  AUDIT_LOG_DB_NAME!: string;

  @IsString()
  AUDIT_LOG_DB_SCHEMA!: string;

  @IsString()
  AUDIT_LOG_DB_LOGGING!: string;

  @IsString()
  AUDIT_LOG_DB_SSL!: string;

  @IsString()
  AUDIT_LOG_DB_MIGRATIONS_RUN!: string;

  @IsEnum(EnvironmentEnum)
  GRAPHQL_SERVER!: EnvironmentEnum;

  @IsString()
  REDIS_HOST!: string;

  @IsNumber()
  REDIS_PORT!: number;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  JWT_EXPIRES_IN!: string;

  @IsString()
  GITHUB_TOKEN!: string;

  @IsString()
  TEST_TOKEN!: string;
}
