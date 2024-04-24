import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0003 } from '../domain-0003.entity';

@InputType()
export class Domain0003WhereInput extends OmitType(
  ToWhereInputType(Domain0003),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0003>> {
    const { ...where } = this;
    return { ...where };
  }
}
