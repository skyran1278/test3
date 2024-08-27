import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0024 } from '../domain-0024.entity';

@InputType()
export class Domain0024WhereInput extends OmitType(
  ToWhereInputType(Domain0024),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0024>> {
    const { ...where } = this;
    return { ...where };
  }
}
