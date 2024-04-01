import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0009 } from '../domain-0009.entity';

@InputType()
export class Domain0009WhereInput extends OmitType(
  ToWhereInputType(Domain0009),
  [],
) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0009>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
