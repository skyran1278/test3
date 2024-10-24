import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { AuditLogByIdLoader } from './audit-log-by-id.loader';
import { AuditLog } from './audit-log.audit-log-entity';
import { AuditLogById } from './query/audit-log-by-id.type';

@Resolver(() => AuditLogById)
export class AuditLogByIdResolver {
  constructor(private readonly loader: AuditLogByIdLoader) {}

  @ResolveField(() => AuditLog, { nullable: true })
  async auditLog(
    @Parent() { auditLogId, auditLog }: AuditLogById,
  ): Promise<Maybe<AuditLog>> {
    if (auditLog) return auditLog;
    if (auditLogId) return this.loader.load(auditLogId);
    return null;
  }
}
