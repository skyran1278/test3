import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { EnvironmentEnum } from './environment.enum';

export class EnvironmentVariables {
  @IsEnum(EnvironmentEnum)
  NODE_ENV: EnvironmentEnum = EnvironmentEnum.DEVELOPMENT;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number = 3010;

  @IsBoolean()
  NEST_DEBUG: boolean = true;

  @IsString()
  DB_HOST: string = 'localhost';

  @IsNumber()
  DB_PORT: number = 5510;

  @IsString()
  DB_USERNAME: string = 'postgres';

  @IsString()
  DB_PASSWORD: string = 'root';

  @IsString()
  DB_NAME: string = 'postgres';

  @IsString()
  DB_SCHEMA: string = 'public';

  @IsBoolean()
  DB_LOGGING: boolean = true;

  @IsEnum(EnvironmentEnum)
  GRAPHQL_SERVER: EnvironmentEnum = EnvironmentEnum.DEVELOPMENT;

  @IsString()
  REDIS_HOST: string = 'localhost';

  @IsNumber()
  REDIS_PORT: number = 6379;

  @IsString()
  JWT_SECRET: string = '001';

  @IsString()
  JWT_EXPIRES_IN: string = '100d';

  @IsString()
  GITHUB_TOKEN: string = '';

  @IsString()
  TEST_TOKEN: string = '';
}
