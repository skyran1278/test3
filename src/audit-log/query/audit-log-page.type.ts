import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { AuditLog } from '../audit-log.audit-log-entity';

@ObjectType({
  implements: [NodePage],
})
export class AuditLogPage implements NodePage<AuditLog> {
  @Field(() => [AuditLog], { description: 'Nodes in this page' })
  nodes!: AuditLog[];
}
