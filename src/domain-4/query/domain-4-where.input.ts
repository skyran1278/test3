import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain4 } from '../domain-4.entity';

@InputType()
export class Domain4WhereInput extends OmitType(ToWhereInputType(Domain4), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain4>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
