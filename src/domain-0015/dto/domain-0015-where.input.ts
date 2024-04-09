import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0015 } from '../domain-0015.entity';

@InputType()
export class Domain0015WhereInput extends ToWhereInputType(
  OmitType(Domain0015, []),
) {
  toFindOptionsWhere = (): Nullable<FindOptionsWhere<Domain0015>> => {
    super.toFindOptionsWhere();
    const { ...where } = this;
    return { ...where };
  };
}
