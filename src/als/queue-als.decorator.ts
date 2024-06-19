import { randomUUID } from 'crypto';

import { createMongoAbility } from '@casl/ability';
import { applyDecorators } from '@nestjs/common';
import { Job } from 'bullmq';

import { CaslAbility } from '../casl/casl-ability.factory';
import { JobInput } from '../common/job';
import { RunAls } from './als.decorator';

export function QueueAls() {
  return applyDecorators(
    RunAls({
      setup: (alsService, job: Job<JobInput>) => {
        alsService.set('requestId', job.id ?? randomUUID());
        alsService.set('user', job.data.user);
        alsService.set('rules', job.data.rules);
        alsService.set(
          'ability',
          createMongoAbility<CaslAbility>(job.data.rules),
        );
        alsService.set('input', JSON.stringify(job.data));
      },
    }),
  );
}
