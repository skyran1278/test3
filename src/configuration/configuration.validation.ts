import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

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

  @IsEnum(Environment)
  GRAPHQL_SERVER: Environment = Environment.Development;

  @IsString()
  REDIS_HOST: string = 'localhost';

  @IsNumber()
  REDIS_PORT: number = 6379;

  @IsString()
  JWT_SECRET: string = 'secret';

  @IsString()
  JWT_EXPIRES_IN: string = '100d';

  @IsString()
  GITHUB_TOKEN: string = '';

  @IsString()
  TEST_TOKEN: string = '';
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
