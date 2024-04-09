import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0009 } from '../domain-0009.entity';

@InputType()
export class Domain0009WhereInput extends ToWhereInputType(
  OmitType(Domain0009, []),
) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0009>> {
    super.toFindOptionsWhere();
    const { ...where } = this;
    return { ...where };
  }
}
