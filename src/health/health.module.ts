import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './health.controller';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: process.env.NODE_ENV !== 'test',
      errorLogStyle: 'pretty',
    }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
