import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain22 } from '../domain-22.entity';

@InputType()
export class Domain22WhereInput extends OmitType(
  ToWhereInputType(Domain22),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain22>> {
    const { ...where } = this;
    return { ...where };
  }
}
