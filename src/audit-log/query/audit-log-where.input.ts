import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { AuditLog } from '../audit-log.entity';

@InputType()
export class AuditLogWhereInput extends OmitType(
  ToWhereInputType(AuditLog),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<AuditLog>> {
    const { ...where } = this;
    return { ...where };
  }
}
