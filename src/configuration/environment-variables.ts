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
  NODE_ENV!: EnvironmentEnum;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT!: number;

  @IsBoolean()
  NEST_DEBUG!: boolean;

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

  @IsBoolean()
  DB_LOGGING!: boolean;

  @IsBoolean()
  DB_SSL!: boolean;

  @IsBoolean()
  DB_MIGRATIONS_RUN!: boolean;

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
