import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

import { BaseQueue } from '../common/base.queue';
import { QueueEnum } from '../common/queue.enum';
import { Domain15JobEnum } from './domain-15-job.enum';
import {
  CreateDomain15JobInput,
  CreateDomain15JobOutput,
} from './mutation/create-domain-15.job';

@Injectable()
export class Domain15Queue extends BaseQueue<
  CreateDomain15JobInput,
  CreateDomain15JobOutput,
  Domain15JobEnum
> {
  constructor(
    @InjectQueue(QueueEnum.DOMAIN15)
    readonly domain15Queue: Queue<
      CreateDomain15JobInput,
      CreateDomain15JobOutput,
      Domain15JobEnum
    >,
  ) {
    super(domain15Queue);
  }
}
