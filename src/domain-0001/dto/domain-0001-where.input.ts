import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class Domain0001WhereInput extends OmitType(
  ToWhereInputType(Domain0001),
  [],
) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0001>> {
    const { ...where } = this;
    return { ...where };
  }
}
