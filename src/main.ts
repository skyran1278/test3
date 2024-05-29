// import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  StorageDriver,
  initializeTransactionalContext,
} from 'typeorm-transactional';

import { AppModule } from './app.module';
import { CustomValidationError } from './error/custom-validation.error';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule, {
    // https://docs.nestjs.com/techniques/logger
    // we set the bufferLogs to true to make sure all logs will be buffered until a custom logger is attached (WinstonLogger in this case)
    // and the application initialization process either completes or fails.
    // bufferLogs: true,
  });
  // app.useLogger(app.get(WinstonLogger));

  // https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown
  // enableShutdownHooks consumes memory by starting listeners.
  // In cases where you are running multiple Nest apps in a single Node process (e.g., when running parallel tests with Jest), Node may complain about excessive listener processes.
  // For this reason, enableShutdownHooks is not enabled by default.
  // Be aware of this condition when you are running multiple instances in a single Node process.
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const disableErrorMessages =
          configService.get<string>('NODE_ENV') === 'production';
        if (disableErrorMessages) {
          return new CustomValidationError();
        }
        return new CustomValidationError(errors);
      },
    }),
  );

  await app.listen(configService.get('PORT') ?? 3001);
}
void bootstrap();
