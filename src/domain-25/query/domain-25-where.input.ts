import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain25 } from '../domain-25.entity';

@InputType()
export class Domain25WhereInput extends OmitType(
  ToWhereInputType(Domain25),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain25>> {
    const { ...where } = this;
    return { ...where };
  }
}
