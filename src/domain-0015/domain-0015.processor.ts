import { Processor } from '@nestjs/bullmq';
import { NotImplementedException } from '@nestjs/common';
import { Job } from 'bullmq';
import { Transactional } from 'typeorm-transactional';

import { QueueAls } from '../als/queue-als.decorator';
import { EventHandlerWorkerHost } from '../common/event-handler-worker-host';
import { QueueEnum } from '../common/queue.enum';
import { Domain0015JobEnum } from './domain-0015-job.enum';
import { Domain0015Repository } from './domain-0015.repository';
import {
  CreateDomain0015JobInput,
  CreateDomain0015JobOutput,
} from './mutation/create-domain-0015.job';

@Processor(QueueEnum.DOMAIN0015)
export class Domain0015Processor extends EventHandlerWorkerHost {
  constructor(private readonly domain0015Repo: Domain0015Repository) {
    super();
  }

  @QueueAls()
  @Transactional()
  async process(job: Job<unknown, unknown, Domain0015JobEnum>) {
    switch (job.name) {
      case Domain0015JobEnum.CREATE_DOMAIN0015_JOB:
        return this.createDomain0015(job as Job<CreateDomain0015JobInput>);
      default:
        throw new NotImplementedException(`Unknown job name.`);
    }
  }

  async createDomain0015(
    job: Job<CreateDomain0015JobInput>,
  ): Promise<CreateDomain0015JobOutput> {
    const { input } = job.data;

    const domain0015 = this.domain0015Repo.create(input);
    await this.domain0015Repo.save(domain0015);

    return { domain0015 };
  }
}
