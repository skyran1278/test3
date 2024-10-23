import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { AuditLog } from '../audit-log.entity';

@InterfaceType()
export abstract class AuditLogById {
  @Field(() => ID, { nullable: true })
  auditLogId?: Maybe<string>;

  @Field(() => AuditLog, { nullable: true })
  auditLog?: Maybe<AuditLog>;
}
