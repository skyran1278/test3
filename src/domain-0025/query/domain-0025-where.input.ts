import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0025 } from '../domain-0025.entity';

@InputType()
export class Domain0025WhereInput extends OmitType(
  ToWhereInputType(Domain0025),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0025>> {
    const { ...where } = this;
    return { ...where };
  }
}
