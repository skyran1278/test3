import { applyDecorators } from '@nestjs/common';
import { Job } from 'bullmq';

import { RunAls } from './als.decorator';

export function QueueAls() {
  return applyDecorators(
    RunAls({
      setup: (alsService, job: Job) => alsService.set('requestId', job.id),
    }),
  );
}
