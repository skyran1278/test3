import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0009 } from '../domain-0009.entity';

@InputType()
export class Domain0009WhereInput extends OmitType(
  ToWhereInputType(Domain0009),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0009>> {
    const { ...where } = this;
    return { ...where };
  }
}
