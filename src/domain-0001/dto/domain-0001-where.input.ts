import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class Domain0001WhereInput extends ToWhereInputType(
  OmitType(Domain0001, []),
) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0001>> {
    super.toFindOptionsWhere();
    const { ...where } = this;
    return { ...where };
  }
}
