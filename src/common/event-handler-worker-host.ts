import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { HttpException } from '@nestjs/common';
import { Job } from 'bullmq';

export abstract class EventHandlerWorkerHost extends WorkerHost {
  @OnWorkerEvent('failed')
  async onFailed(job: Job, error: Error) {
    if (error instanceof HttpException) {
      await job.log(JSON.stringify(error.getResponse()));
    } else {
      await job.log(error.message);
    }
  }
}
