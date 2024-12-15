import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain24 } from '../domain-24.entity';

@InputType()
export class Domain24WhereInput extends OmitType(
  ToWhereInputType(Domain24),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain24>> {
    const { ...where } = this;
    return { ...where };
  }
}
