import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain09 } from '../domain-09.entity';

@InputType()
export class Domain09WhereInput extends OmitType(
  ToWhereInputType(Domain09),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain09>> {
    const { ...where } = this;
    return { ...where };
  }
}
