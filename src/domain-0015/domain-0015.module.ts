import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueueEnum } from '../common/queue.enum';
import { Domain0015 } from './domain-0015.entity';
import { Domain0015Processor } from './domain-0015.processor';
import { Domain0015Queue } from './domain-0015.queue';
import { Domain0015QueueEvents } from './domain-0015.queue-events';
import { Domain0015Repository } from './domain-0015.repository';
import { Domain0015Resolver } from './domain-0015.resolver';
import { Domain0015Service } from './domain-0015.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Domain0015]),
    BullModule.registerQueue({
      name: QueueEnum.DOMAIN0015,
    }),
    BullBoardModule.forFeature({
      name: QueueEnum.DOMAIN0015,
      adapter: BullMQAdapter,
    }),
  ],
  providers: [
    Domain0015Repository,
    Domain0015Service,
    Domain0015Resolver,
    Domain0015Processor,
    Domain0015Queue,
    Domain0015QueueEvents,
    // Domain0015ByIdLoader,
    // Domain0015ByIdResolver,
  ],
})
export class Domain0015Module {}
