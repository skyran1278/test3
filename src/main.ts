import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
// import 'dotenv/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // https://docs.nestjs.com/techniques/logger
    // we set the bufferLogs to true to make sure all logs will be buffered until a custom logger is attached (WinstonLogger in this case)
    // and the application initialization process either completes or fails.
    // bufferLogs: true,
  });
  // app.useLogger(app.get(WinstonLogger));
  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') ?? 3001);
}
void bootstrap();
