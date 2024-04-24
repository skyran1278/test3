import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0015 } from '../domain-0015.entity';

@InputType()
export class Domain0015WhereInput extends OmitType(
  ToWhereInputType(Domain0015),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0015>> {
    const { ...where } = this;
    return { ...where };
  }
}
