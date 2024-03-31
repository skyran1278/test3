import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain5 } from '../domain-5.entity';

@InputType()
export class Domain5WhereInput extends OmitType(ToWhereInputType(Domain5), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain5>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
