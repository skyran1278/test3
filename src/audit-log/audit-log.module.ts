import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueueEnum } from '../common/queue.enum';
import { AuditLog } from './audit-log.audit-log-entity';
import { AuditLogProcessor } from './audit-log.processor';
import { AuditLogQueue } from './audit-log.queue';
import { AuditLogRepository } from './audit-log.repository';
import { AuditLogService } from './audit-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog], process.env.AUDIT_LOG_DB_NAME),
    BullModule.registerQueue({
      name: QueueEnum.AUDIT_LOG,
    }),
  ],
  providers: [
    AuditLogRepository,
    AuditLogService,
    AuditLogQueue,
    AuditLogProcessor,
    // AuditLogResolver,
    // AuditLogByIdLoader,
    // AuditLogByIdResolver,
  ],
  exports: [AuditLogQueue],
})
export class AuditLogModule {}
