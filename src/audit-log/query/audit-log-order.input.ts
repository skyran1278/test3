import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { AuditLog } from '../audit-log.audit-log-entity';

@InputType()
export class AuditLogOrderInput extends OmitType(
  ToOrderInputType(AuditLog),
  [],
) {}
