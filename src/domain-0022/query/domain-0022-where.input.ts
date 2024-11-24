import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0022 } from '../domain-0022.entity';

@InputType()
export class Domain0022WhereInput extends OmitType(
  ToWhereInputType(Domain0022),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0022>> {
    const { ...where } = this;
    return { ...where };
  }
}
