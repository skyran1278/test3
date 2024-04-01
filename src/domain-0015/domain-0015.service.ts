import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { BaseService } from 'src/common/base.service';
import { QueueEnum } from 'src/common/queue.enum';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import {
  CreateDomain0015JobInput,
  CreateDomain0015JobOutput,
} from './create-domain-0015-job.interface';
import { Domain0015JobEnum } from './domain-0015-job.enum';
import { Domain0015 } from './domain-0015.entity';
import { Domain0015QueueEvents } from './domain-0015.queue-events';
import { CreateDomain0015Input } from './mutation/create-domain-0015.input';
import { UpdateDomain0015Input } from './mutation/update-domain-0015.input';
import { Domain0015PageArgs } from './query/domain-0015-page.args';

@Injectable()
export class Domain0015Service extends BaseService<Domain0015> {
  constructor(
    @InjectRepository(Domain0015)
    readonly repo: Repository<Domain0015>,
    private readonly manager: EntityManager,
    @InjectQueue(QueueEnum.DOMAIN0015)
    private domain0015Queue: Queue<
      CreateDomain0015JobInput,
      CreateDomain0015JobOutput
    >,
    private readonly domain0015QueueEvents: Domain0015QueueEvents,
  ) {
    super(repo);
  }

  async saveOne(
    input: CreateDomain0015Input | UpdateDomain0015Input,
    options: ServiceOptions,
  ): Promise<Domain0015> {
    const job = await this.domain0015Queue.add(
      Domain0015JobEnum.CREATE_DOMAIN0015_JOB,
      {
        input,
        user: options.user,
      },
    );

    const { domain0015 } = await job.waitUntilFinished(
      this.domain0015QueueEvents.queueEvents,
    );

    return domain0015;
  }

  findPage(args: Domain0015PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0015 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0015, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
