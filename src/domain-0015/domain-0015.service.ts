import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue, QueueEvents } from 'bullmq';
import { AlsService } from 'src/als/als.service';
import { BaseService } from 'src/common/base.service';
import { QueueEnum } from 'src/common/queue.enum';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { Domain0015 } from './domain-0015.entity';
import { Domain0015QueueEvents } from './domain-0015.queue-events';
import { CreateDomain0015Input } from './dto/create-domain-0015.input';
import {
  CreateDomain0015JobInput,
  CreateDomain0015JobOutput,
} from './dto/create-domain-0015.job';
import { Domain0015JobEnum } from './dto/domain-0015-job.enum';
import { Domain0015PageArgs } from './dto/domain-0015-page.args';
import { UpdateDomain0015Input } from './dto/update-domain-0015.input';

@Injectable()
export class Domain0015Service extends BaseService<Domain0015> {
  constructor(
    @InjectRepository(Domain0015)
    readonly repo: Repository<Domain0015>,
    @InjectQueue(QueueEnum.DOMAIN0015)
    private domain0015Queue: Queue<
      CreateDomain0015JobInput,
      CreateDomain0015JobOutput
    >,
    private readonly domain0015QueueEvents: Domain0015QueueEvents,
    private readonly configService: ConfigService,
    private readonly alsService: AlsService,
  ) {
    super(repo);
  }

  // @Transactional()
  async saveOne(
    input: CreateDomain0015Input | UpdateDomain0015Input,
  ): Promise<Domain0015> {
    const user = this.alsService.get('user');

    const job = await this.domain0015Queue.add(
      Domain0015JobEnum.CREATE_DOMAIN0015_JOB,
      {
        input,
        user,
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
    const user = this.alsService.get('user');

    const job = await this.domain0015Queue.add(
      Domain0015JobEnum.CREATE_DOMAIN0015_JOB,
      {
        input,
        user,
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
