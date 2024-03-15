import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain2 } from '../domain-2.entity';

@InputType()
export class Domain2WhereInput extends OmitType(ToWhereInputType(Domain2), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain2>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
