import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain21 } from '../domain-21.entity';

@InputType()
export class Domain21WhereInput extends OmitType(
  ToWhereInputType(Domain21),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain21>> {
    const { ...where } = this;
    return { ...where };
  }
}
