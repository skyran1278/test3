import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class Domain1WhereInput extends OmitType(ToWhereInputType(Domain1), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain1>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
