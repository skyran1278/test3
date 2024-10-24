import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { AuditLog } from '../audit-log.audit-log-entity';

@InputType()
export class CreateAuditLogInput extends OmitType(
  ToCreateInputType(AuditLog),
  [],
) {}
