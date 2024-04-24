import { InputType, OmitType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0006WhereInput } from '../../domain-0006/dto/domain-0006-where.input';
import { Domain0005 } from '../domain-0005.entity';

@InputType()
export class Domain0005WhereInput extends OmitType(
  ToWhereInputType(Domain0005),
  [],
) {
  @TypeField(() => Domain0006WhereInput, { nullable: true })
  domain0006s?: Maybe<Domain0006WhereInput>;

  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0005>> {
    const { domain0006s, ...where } = this;
    return { ...where, domain0006s: domain0006s?.toFindOptionsWhere() };
  }
}
