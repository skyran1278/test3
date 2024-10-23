import { Field, ObjectType } from '@nestjs/graphql';

import { AuditLog } from '../audit-log.entity';

@ObjectType()
export class UpdateAuditLogOutput {
  @Field(() => AuditLog)
  auditLog!: AuditLog;
}
