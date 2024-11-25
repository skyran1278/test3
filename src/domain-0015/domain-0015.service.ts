import { Injectable } from '@nestjs/common';
import { QueueEvents } from 'bullmq';
import { Transactional } from 'typeorm-transactional';

import { QueueEnum } from '../common/queue.enum';
import { TypedConfigService } from '../configuration/typed-config.service';
import { Domain0015JobEnum } from './domain-0015-job.enum';
import { Domain0015 } from './domain-0015.entity';
import { Domain0015Queue } from './domain-0015.queue';
import { Domain0015QueueEvents } from './domain-0015.queue-events';
import { Domain0015Repository } from './domain-0015.repository';
import { CreateDomain0015Input } from './mutation/create-domain-0015.input';
import { UpdateDomain0015Input } from './mutation/update-domain-0015.input';
import { Domain0015PageArgs } from './query/domain-0015-page.args';

@Injectable()
export class Domain0015Service {
  constructor(
    private readonly repo: Domain0015Repository,
    private readonly domain0015Queue: Domain0015Queue,
    private readonly domain0015QueueEvents: Domain0015QueueEvents,
    private readonly configService: TypedConfigService,
  ) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0015Input | UpdateDomain0015Input,
  ): Promise<Domain0015> {
    const job = await this.domain0015Queue.add(
      Domain0015JobEnum.CREATE_DOMAIN0015_JOB,
      {
        input,
      },
    );

    const { domain0015 } = await job.waitUntilFinished(
      this.domain0015QueueEvents.queueEvents,
    );

    return domain0015;
  }

  @Transactional()
  async testQueueEventsRaceCondition(
    input: CreateDomain0015Input | UpdateDomain0015Input,
  ): Promise<Domain0015> {
    const job = await this.domain0015Queue.add(
      Domain0015JobEnum.CREATE_DOMAIN0015_JOB,
      {
        input,
      },
    );

    const queueEvents = new QueueEvents(QueueEnum.DOMAIN0015, {
      connection: {
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT'),
      },
    });
    // await queueEvents.waitUntilReady();
    const { domain0015 } = await job.waitUntilFinished(queueEvents);

    return domain0015;
  }

  @Transactional()
  findPage(args: Domain0015PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0015 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0015);
  }
}
