import { InputType, OmitType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { TypeField } from 'src/common/type-field.decorator';
import { Domain0006WhereInput } from 'src/domain-0006/dto/domain-0006-where.input';
import { FindOptionsWhere } from 'typeorm';

import { Domain0005 } from '../domain-0005.entity';

@InputType()
export class Domain0005WhereInput extends ToWhereInputType(
  OmitType(Domain0005, []),
) {
  @TypeField(() => Domain0006WhereInput, { nullable: true })
  domain0006s?: Maybe<Domain0006WhereInput>;

  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0005>> {
    const { ...where } = super.toFindOptionsWhere() as this;
    return { ...where };
  }
}
