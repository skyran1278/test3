import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueEvents } from 'bullmq';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { BaseService } from '../common/base.service';
import { QueueEnum } from '../common/queue.enum';
import { TypedConfigService } from '../configuration/typed-config.service';
import { Domain0015 } from './domain-0015.entity';
import { Domain0015Queue } from './domain-0015.queue';
import { Domain0015QueueEvents } from './domain-0015.queue-events';
import { CreateDomain0015Input } from './dto/create-domain-0015.input';
import { Domain0015JobEnum } from './dto/domain-0015-job.enum';
import { Domain0015PageArgs } from './dto/domain-0015-page.args';
import { UpdateDomain0015Input } from './dto/update-domain-0015.input';

@Injectable()
export class Domain0015Service extends BaseService<Domain0015> {
  constructor(
    @InjectRepository(Domain0015)
    readonly repo: Repository<Domain0015>,
    private domain0015Queue: Domain0015Queue,
    private readonly domain0015QueueEvents: Domain0015QueueEvents,
    private readonly configService: TypedConfigService,
  ) {
    super(repo);
  }

  // @Transactional()
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
    return this.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0015 = await this.findOneByOrFail({ id });

    return this.softRemove(domain0015);
  }
}
