import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain10 } from '../domain-10.entity';

@InputType()
export class Domain10WhereInput extends OmitType(
  ToWhereInputType(Domain10),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain10>> {
    const { ...where } = this;
    return { ...where };
  }
}
