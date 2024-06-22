import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

import { BaseQueue } from '../common/base.queue';
import { QueueEnum } from '../common/queue.enum';
import {
  CreateDomain0015JobInput,
  CreateDomain0015JobOutput,
} from './mutation/create-domain-0015.job';
import { Domain0015JobEnum } from './mutation/domain-0015-job.enum';

@Injectable()
export class Domain0015Queue extends BaseQueue<
  CreateDomain0015JobInput,
  CreateDomain0015JobOutput,
  Domain0015JobEnum
> {
  constructor(
    @InjectQueue(QueueEnum.DOMAIN0015)
    readonly domain0015Queue: Queue<
      CreateDomain0015JobInput,
      CreateDomain0015JobOutput,
      Domain0015JobEnum
    >,
  ) {
    super(domain0015Queue);
  }
}
