import { InputType, OmitType } from '@nestjs/graphql';
import { DeepNullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0007 } from '../domain-0007.entity';

@InputType()
export class Domain0007WhereInput extends OmitType(
  ToWhereInputType(Domain0007),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0007>> {
    const { ...where } = this;
    return { ...where };
  }
}
