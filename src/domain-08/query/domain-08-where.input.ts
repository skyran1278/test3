import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { TypeField } from '../../common/type-field.decorator';
import { Domain09WhereInput } from '../../domain-09/query/domain-09-where.input';
import { Domain08 } from '../domain-08.entity';

@InputType()
export class Domain08WhereInput extends OmitType(
  ToWhereInputType(Domain08),
  [],
) {
  @TypeField(() => Domain09WhereInput, { nullable: true })
  domain09s?: Domain09WhereInput;

  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain08>> {
    const { domain09s, ...where } = this;
    return { ...where, domain09s: domain09s?.toFindOptionsWhere() };
  }
}
