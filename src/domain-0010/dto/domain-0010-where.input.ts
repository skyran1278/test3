import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0010 } from '../domain-0010.entity';

@InputType()
export class Domain0010WhereInput extends OmitType(
  ToWhereInputType(Domain0010),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0010>> {
    const { ...where } = this;
    return { ...where };
  }
}
