import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { AuditLog } from './audit-log.entity';
import { AuditLogRepository } from './audit-log.repository';
import { CreateAuditLogInput } from './mutation/create-audit-log.input';
import { UpdateAuditLogInput } from './mutation/update-audit-log.input';

@Injectable()
export class AuditLogService {
  constructor(private readonly repo: AuditLogRepository) {}

  @Transactional()
  async saveOne(
    input: CreateAuditLogInput | UpdateAuditLogInput,
  ): Promise<AuditLog> {
    const auditLog = await this.repo.save(input);

    return auditLog;
  }

  // @Transactional()
  // findPage(args: AuditLogPageArgs) {
  //   return this.repo.findNodePage(args);
  // }

  @Transactional()
  async removeOne(id: string) {
    const auditLog = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(auditLog);
  }
}
