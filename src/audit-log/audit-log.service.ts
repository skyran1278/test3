import { Injectable, NotImplementedException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { AuditActionEnum } from './audit-action.enum';
import { AuditLog } from './audit-log.entity';
import { AuditLogRepository } from './audit-log.repository';
import { CreateAuditLogInput } from './mutation/create-audit-log.input';
import { UpdateAuditLogInput } from './mutation/update-audit-log.input';

@Injectable()
export class AuditLogService {
  constructor(
    private readonly repo: AuditLogRepository,
    private readonly manager: EntityManager,
  ) {}

  @Transactional()
  async revertOne(requestId: string) {
    const auditLogs = await this.repo.find({ where: { requestId } });

    for (const auditLog of auditLogs) {
      const entityRepo = this.manager.getRepository(auditLog.tableName);
      switch (auditLog.action) {
        case AuditActionEnum.INSERT:
          await entityRepo.remove(entityRepo.create(auditLog.newEntity));
          break;
        case AuditActionEnum.UPDATE:
        case AuditActionEnum.REMOVE:
          await entityRepo.save(entityRepo.create(auditLog.previousEntity));
          break;
        // case AuditActionEnum.SOFT_REMOVE:
        //   await entityRepo.restore(auditLog.entityId);
        //   break;
        // case AuditActionEnum.RECOVER:
        //   await entityRepo.softRemove(auditLog.previousEntity);
        //   break;
        default:
          throw new NotImplementedException('Unknown AuditActionEnum');
      }
    }

    return auditLogs;
  }

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
