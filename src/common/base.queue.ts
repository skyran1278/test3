import { Job, JobsOptions, Queue } from 'bullmq';

import { alsService } from '../als/als.service';
import { JobInput } from './job';

export class BaseQueue<
  DataType extends JobInput = JobInput,
  ResultType = unknown,
  NameType extends string = string,
> extends Queue<DataType, ResultType, NameType> {
  constructor(private readonly queue: Queue<DataType, ResultType, NameType>) {
    super(queue.name, queue.opts);
  }

  add(
    name: NameType,
    data: Omit<DataType, 'user' | 'rules'>,
    opts?: JobsOptions,
  ): Promise<Job<DataType, ResultType, NameType>> {
    const user = alsService.getOrFail('user');
    const rules = alsService.getOrFail('rules');

    return this.queue.add(name, { ...data, user, rules } as DataType, opts);
  }
}
