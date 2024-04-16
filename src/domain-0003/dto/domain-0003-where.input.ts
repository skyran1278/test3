import { InputType, OmitType } from '@nestjs/graphql';
import { DeepNullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0003 } from '../domain-0003.entity';

@InputType()
export class Domain0003WhereInput extends OmitType(
  ToWhereInputType(Domain0003),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0003>> {
    const { ...where } = this;
    return { ...where };
  }
}
