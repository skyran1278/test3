import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QueueEnum } from 'src/common/queue.enum';
import { EntityManager } from 'typeorm';

import {
  CreateDomain0015JobInput,
  CreateDomain0015JobOutput,
} from './create-domain-0015-job.interface';
import { Domain0015JobEnum } from './domain-0015-job.enum';
import { Domain0015Service } from './domain-0015.service';

@Processor(QueueEnum.DOMAIN0015)
export class Domain0015Processor extends WorkerHost {
  constructor(
    private readonly manager: EntityManager,
    private readonly domain0015Service: Domain0015Service,
  ) {
    super();
  }
  async process(job: Job<unknown, unknown, Domain0015JobEnum>) {
    switch (job.name) {
      case Domain0015JobEnum.CREATE_DOMAIN0015_JOB:
        return this.createDomain0015(job as Job<CreateDomain0015JobInput>);
      default:
        throw new Error(`Unknown job name`);
    }
  }

  async createDomain0015(
    job: Job<CreateDomain0015JobInput>,
  ): Promise<CreateDomain0015JobOutput> {
    const transaction = async (manager: EntityManager) => {
      const { input, user } = job.data;
      const domain0015 = await this.domain0015Service.save(input, {
        manager,
        user,
      });

      return { domain0015 };
    };

    return this.manager.transaction('READ COMMITTED', transaction);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    // do some stuff
  }
}
