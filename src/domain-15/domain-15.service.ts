import { Injectable } from '@nestjs/common';
import { QueueEvents } from 'bullmq';
import { Transactional } from 'typeorm-transactional';

import { QueueEnum } from '../common/queue.enum';
import { TypedConfigService } from '../configuration/typed-config.service';
import { Domain15JobEnum } from './domain-15-job.enum';
import { Domain15 } from './domain-15.entity';
import { Domain15Queue } from './domain-15.queue';
import { Domain15QueueEvents } from './domain-15.queue-events';
import { Domain15Repository } from './domain-15.repository';
import { CreateDomain15Input } from './mutation/create-domain-15.input';
import { UpdateDomain15Input } from './mutation/update-domain-15.input';
import { Domain15PageArgs } from './query/domain-15-page.args';

@Injectable()
export class Domain15Service {
  constructor(
    private readonly repo: Domain15Repository,
    private readonly domain15Queue: Domain15Queue,
    private readonly domain15QueueEvents: Domain15QueueEvents,
    private readonly configService: TypedConfigService,
  ) {}

  @Transactional()
  async saveOne(
    input: CreateDomain15Input | UpdateDomain15Input,
  ): Promise<Domain15> {
    const job = await this.domain15Queue.add(
      Domain15JobEnum.CREATE_DOMAIN15_JOB,
      {
        input,
      },
    );

    const { domain15 } = await job.waitUntilFinished(
      this.domain15QueueEvents.queueEvents,
    );

    return domain15;
  }

  @Transactional()
  async testQueueEventsRaceCondition(
    input: CreateDomain15Input | UpdateDomain15Input,
  ): Promise<Domain15> {
    const job = await this.domain15Queue.add(
      Domain15JobEnum.CREATE_DOMAIN15_JOB,
      {
        input,
      },
    );

    const queueEvents = new QueueEvents(QueueEnum.DOMAIN15, {
      connection: {
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT'),
      },
    });
    // await queueEvents.waitUntilReady();
    const { domain15 } = await job.waitUntilFinished(queueEvents);

    return domain15;
  }

  @Transactional()
  findPage(args: Domain15PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain15 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain15);
  }
}
