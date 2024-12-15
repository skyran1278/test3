import { Processor } from '@nestjs/bullmq';
import { NotImplementedException } from '@nestjs/common';
import { Job } from 'bullmq';
import { Transactional } from 'typeorm-transactional';

import { QueueAls } from '../als/queue-als.decorator';
import { EventHandlerWorkerHost } from '../common/event-handler-worker-host';
import { QueueEnum } from '../common/queue.enum';
import { Domain15JobEnum } from './domain-15-job.enum';
import { Domain15Repository } from './domain-15.repository';
import {
  CreateDomain15JobInput,
  CreateDomain15JobOutput,
} from './mutation/create-domain-15.job';

@Processor(QueueEnum.DOMAIN15)
export class Domain15Processor extends EventHandlerWorkerHost {
  constructor(private readonly domain15Repo: Domain15Repository) {
    super();
  }

  @QueueAls()
  @Transactional()
  async process(job: Job<unknown, unknown, Domain15JobEnum>) {
    switch (job.name) {
      case Domain15JobEnum.CREATE_DOMAIN15_JOB:
        return this.createDomain15(job as Job<CreateDomain15JobInput>);
      default:
        throw new NotImplementedException(`Unknown job name.`);
    }
  }

  async createDomain15(
    job: Job<CreateDomain15JobInput>,
  ): Promise<CreateDomain15JobOutput> {
    const { input } = job.data;

    const domain15 = this.domain15Repo.create(input);
    await this.domain15Repo.save(domain15);

    return { domain15 };
  }
}
