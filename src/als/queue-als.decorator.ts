import { applyDecorators } from '@nestjs/common';
import { Job } from 'bullmq';

import { RunAls } from './als.decorator';

export function QueueAls() {
  return applyDecorators(
    RunAls({ setup: (als, job: Job) => als.set('id', job.id) }),
  );
}
