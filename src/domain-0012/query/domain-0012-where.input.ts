import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0012 } from '../domain-0012.entity';

@InputType()
export class Domain0012WhereInput extends OmitType(ToWhereInputType(Domain0012), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0012>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
