import { InputType, OmitType } from '@nestjs/graphql';
import { DeepNullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

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
