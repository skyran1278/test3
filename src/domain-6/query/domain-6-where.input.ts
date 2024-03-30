import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain6 } from '../domain-6.entity';

@InputType()
export class Domain6WhereInput extends OmitType(ToWhereInputType(Domain6), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain6>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
