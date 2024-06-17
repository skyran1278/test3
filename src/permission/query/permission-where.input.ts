import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Permission } from '../permission.entity';

@InputType()
export class PermissionWhereInput extends OmitType(
  ToWhereInputType(Permission),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Permission>> {
    const { ...where } = this;
    return { ...where };
  }
}
