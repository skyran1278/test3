import { InputType } from '@nestjs/graphql';
import { ToWhereInputType } from 'src/common/graphql/to-where-input-type';
import { Nullable } from 'src/common/nullable.interface';
import { FindOptionsWhere } from 'typeorm';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class Domain1WhereInput extends ToWhereInputType(Domain1) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain1>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
