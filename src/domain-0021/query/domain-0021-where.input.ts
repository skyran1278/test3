import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0021 } from '../domain-0021.entity';

@InputType()
export class Domain0021WhereInput extends OmitType(
  ToWhereInputType(Domain0021),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0021>> {
    const { ...where } = this;
    return { ...where };
  }
}
