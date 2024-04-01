import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0004 } from '../domain-0004.entity';

@InputType()
export class Domain0004WhereInput extends OmitType(ToWhereInputType(Domain0004), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0004>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
