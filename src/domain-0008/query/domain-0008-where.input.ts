import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0008 } from '../domain-0008.entity';

@InputType()
export class Domain0008WhereInput extends OmitType(
  ToWhereInputType(Domain0008),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0008>> {
    const { ...where } = this;
    return { ...where };
  }
}
