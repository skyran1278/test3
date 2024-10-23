import { Field, ObjectType } from '@nestjs/graphql';

import { AuditLog } from '../audit-log.entity';

@ObjectType()
export class RemoveAuditLogOutput {
  @Field(() => AuditLog)
  auditLog!: AuditLog;
}
