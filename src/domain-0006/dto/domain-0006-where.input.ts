import { InputType, OmitType } from '@nestjs/graphql';
import { DeepNullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

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
