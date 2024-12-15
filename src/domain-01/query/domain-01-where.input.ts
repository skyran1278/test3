import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain01 } from '../domain-01.entity';

@InputType()
export class Domain01WhereInput extends OmitType(
  ToWhereInputType(Domain01),
  [],
) {
  toFindOptionsWhere(): FindOptionsWhere<Domain01> {
    const { ...where } = this;
    return { ...where };
  }
}
