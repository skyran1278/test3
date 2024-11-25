import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

import { BaseQueue } from '../common/base.queue';
import { QueueEnum } from '../common/queue.enum';
import { AuditLogJobEnum } from './audit-log-job.enum';
import {
  CreateAuditLogsJobInput,
  CreateAuditLogsJobOutput,
} from './mutation/create-audit-logs.job';

@Injectable()
export class AuditLogQueue extends BaseQueue<
  CreateAuditLogsJobInput,
  CreateAuditLogsJobOutput,
  AuditLogJobEnum
> {
  constructor(
    @InjectQueue(QueueEnum.AUDIT_LOG)
    readonly auditLogQueue: Queue<
      CreateAuditLogsJobInput,
      CreateAuditLogsJobOutput,
      AuditLogJobEnum
    >,
  ) {
    super(auditLogQueue);
  }
}
