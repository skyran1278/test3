import { randomUUID } from 'crypto';

import { applyDecorators } from '@nestjs/common';
import { Job } from 'bullmq';

import { JobInput } from '../common/job';
import { RunAls } from './als.decorator';

export function QueueAls() {
  return applyDecorators(
    RunAls({
      setup: (alsService, job: Job<JobInput>) => {
        alsService.set('requestId', job.id ?? randomUUID());
        alsService.set('user', job.data.user);
        alsService.set('input', JSON.stringify(job.data));
      },
    }),
  );
}
