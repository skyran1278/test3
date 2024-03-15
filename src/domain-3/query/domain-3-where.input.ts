import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain3 } from '../domain-3.entity';

@InputType()
export class Domain3WhereInput extends OmitType(ToWhereInputType(Domain3), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain3>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
