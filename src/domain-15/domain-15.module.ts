import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueueEnum } from '../common/queue.enum';
import { Domain15 } from './domain-15.entity';
import { Domain15Processor } from './domain-15.processor';
import { Domain15Queue } from './domain-15.queue';
import { Domain15QueueEvents } from './domain-15.queue-events';
import { Domain15Repository } from './domain-15.repository';
import { Domain15Resolver } from './domain-15.resolver';
import { Domain15Service } from './domain-15.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Domain15]),
    BullModule.registerQueue({
      name: QueueEnum.DOMAIN15,
    }),
    BullBoardModule.forFeature({
      name: QueueEnum.DOMAIN15,
      adapter: BullMQAdapter,
    }),
  ],
  providers: [
    Domain15Repository,
    Domain15Service,
    Domain15Resolver,
    Domain15Processor,
    Domain15Queue,
    Domain15QueueEvents,
    // Domain15ByIdLoader,
    // Domain15ByIdResolver,
  ],
})
export class Domain15Module {}
