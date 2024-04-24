import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0006 } from '../domain-0006.entity';

@InputType()
export class Domain0006WhereInput extends OmitType(
  ToWhereInputType(Domain0006),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0006>> {
    const { ...where } = this;
    return { ...where };
  }
}
