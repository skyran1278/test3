import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class Domain0001WhereInput extends OmitType(
  ToWhereInputType(Domain0001),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0001>> {
    const { ...where } = this;
    return { ...where };
  }
}
