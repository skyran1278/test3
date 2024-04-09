import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0007 } from '../domain-0007.entity';

@InputType()
export class Domain0007WhereInput extends ToWhereInputType(
  OmitType(Domain0007, []),
) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0007>> {
    super.toFindOptionsWhere();
    const { ...where } = this;
    return { ...where };
  }
}
