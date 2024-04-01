import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain0011 } from '../domain-0011.entity';

@InputType()
export class Domain0011WhereInput extends OmitType(ToWhereInputType(Domain0011), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0011>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
