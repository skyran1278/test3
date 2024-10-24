import { Field, ObjectType } from '@nestjs/graphql';

import { AuditLog } from '../audit-log.audit-log-entity';

@ObjectType()
export class CreateAuditLogOutput {
  @Field(() => AuditLog)
  auditLog!: AuditLog;
}
