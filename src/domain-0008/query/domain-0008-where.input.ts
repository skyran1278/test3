import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0009WhereInput } from '../../domain-0009/query/domain-0009-where.input';
import { Domain0008 } from '../domain-0008.entity';

@InputType()
export class Domain0008WhereInput extends OmitType(
  ToWhereInputType(Domain0008),
  [],
) {
  @TypeField(() => Domain0009WhereInput, { nullable: true })
  domain0009s?: Domain0009WhereInput;

  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0008>> {
    const { domain0009s, ...where } = this;
    return { ...where, domain0009s: domain0009s?.toFindOptionsWhere() };
  }
}
