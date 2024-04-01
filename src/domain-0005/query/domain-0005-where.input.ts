import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0005 } from '../domain-0005.entity';

@InputType()
export class Domain0005WhereInput extends OmitType(ToWhereInputType(Domain0005), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0005>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
