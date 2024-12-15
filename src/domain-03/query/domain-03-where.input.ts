import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain03 } from '../domain-03.entity';

@InputType()
export class Domain03WhereInput extends OmitType(
  ToWhereInputType(Domain03),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain03>> {
    const { ...where } = this;
    return { ...where };
  }
}
