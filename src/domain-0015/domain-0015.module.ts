import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlsModule } from '../als/als.module';
import { QueueEnum } from '../common/queue.enum';
import { Domain0015 } from './domain-0015.entity';
import { Domain0015Processor } from './domain-0015.processor';
import { Domain0015QueueEvents } from './domain-0015.queue-events';
import { Domain0015Resolver } from './domain-0015.resolver';
import { Domain0015Service } from './domain-0015.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Domain0015]),
    BullModule.registerQueue({
      name: QueueEnum.DOMAIN0015,
    }),
    AlsModule,
  ],
  providers: [
    Domain0015Service,
    Domain0015Resolver,
    Domain0015Processor,
    Domain0015QueueEvents,
    // Domain0015ByIdLoader,
    // Domain0015ByIdResolver,
  ],
  exports: [Domain0015QueueEvents],
})
export class Domain0015Module {}
