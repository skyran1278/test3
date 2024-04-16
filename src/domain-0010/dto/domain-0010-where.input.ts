import { InputType, OmitType } from '@nestjs/graphql';
import { DeepNullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

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
