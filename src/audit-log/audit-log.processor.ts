import { Processor } from '@nestjs/bullmq';
import { NotImplementedException } from '@nestjs/common';
import { Job } from 'bullmq';
import { Transactional } from 'typeorm-transactional';

import { QueueAls } from '../als/queue-als.decorator';
import { EventHandlerWorkerHost } from '../common/event-handler-worker-host';
import { QueueEnum } from '../common/queue.enum';
import { AuditLogJobEnum } from './audit-log-job.enum';
import { AuditLogRepository } from './audit-log.repository';
import {
  CreateAuditLogsJobInput,
  CreateAuditLogsJobOutput,
} from './mutation/create-audit-logs.job';

@Processor(QueueEnum.AUDIT_LOG)
export class AuditLogProcessor extends EventHandlerWorkerHost {
  constructor(private readonly auditLogRepo: AuditLogRepository) {
    super();
  }

  @QueueAls()
  @Transactional()
  async process(job: Job<unknown, unknown, AuditLogJobEnum>) {
    switch (job.name) {
      case AuditLogJobEnum.CREATE_AUDIT_LOGS_JOB:
        return this.createAuditLog(job as Job<CreateAuditLogsJobInput>);
      default:
        throw new NotImplementedException(`Unknown job name.`);
    }
  }

  async createAuditLog(
    job: Job<CreateAuditLogsJobInput>,
  ): Promise<CreateAuditLogsJobOutput> {
    const { input } = job.data;

    const auditLogs = await this.auditLogRepo.insert(input.auditLogs);

    return { auditLogs };
  }
}
