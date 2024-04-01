import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0002 } from '../domain-0002.entity';

@InputType()
export class Domain0002WhereInput extends OmitType(ToWhereInputType(Domain0002), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0002>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
