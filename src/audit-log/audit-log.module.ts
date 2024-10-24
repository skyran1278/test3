import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueueEnum } from '../common/queue.enum';
import { AuditLog } from './audit-log.entity';
import { AuditLogProcessor } from './audit-log.processor';
import { AuditLogQueue } from './audit-log.queue';
import { AuditLogRepository } from './audit-log.repository';
import { AuditLogService } from './audit-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog]),
    BullModule.registerQueue({
      name: QueueEnum.AUDIT_LOG,
    }),
    BullBoardModule.forFeature({
      name: QueueEnum.AUDIT_LOG,
      adapter: BullMQAdapter,
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
