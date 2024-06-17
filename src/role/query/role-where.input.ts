import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Role } from '../role.entity';

@InputType()
export class RoleWhereInput extends OmitType(
  ToWhereInputType(Role),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Role>> {
    const { ...where } = this;
    return { ...where };
  }
}
