import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain15 } from '../domain-15.entity';

@InputType()
export class Domain15WhereInput extends OmitType(
  ToWhereInputType(Domain15),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain15>> {
    const { ...where } = this;
    return { ...where };
  }
}
