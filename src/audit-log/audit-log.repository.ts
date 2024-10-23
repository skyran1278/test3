import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { AuditLog } from './audit-log.entity';

@Injectable()
export class AuditLogRepository extends Repository<AuditLog> {
  constructor(readonly manager: EntityManager) {
    super(AuditLog, manager);
  }
}
