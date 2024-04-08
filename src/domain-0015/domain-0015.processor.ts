import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { RunAls } from 'src/als/als.decorator';
import { AlsService } from 'src/als/als.service';
import { QueueEnum } from 'src/common/queue.enum';
import { Transactional } from 'typeorm-transactional';

import { Domain0015Service } from './domain-0015.service';
import {
  CreateDomain0015JobInput,
  CreateDomain0015JobOutput,
} from './dto/create-domain-0015.job';
import { Domain0015JobEnum } from './dto/domain-0015-job.enum';

@Processor(QueueEnum.DOMAIN0015)
export class Domain0015Processor extends WorkerHost {
  constructor(
    private readonly domain0015Service: Domain0015Service,
    private readonly alsService: AlsService,
  ) {
    super();
  }

  @RunAls()
  @Transactional()
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
    const { input, user } = job.data;
    this.alsService.set('user', user);

    const domain0015 = await this.domain0015Service.save(input);

    return { domain0015 };
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    // do some stuff
  }
}
