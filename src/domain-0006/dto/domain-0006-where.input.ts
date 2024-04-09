import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { Between, FindOptionsWhere } from 'typeorm';

import { Domain0006 } from '../domain-0006.entity';

@InputType()
export class Domain0006WhereInput extends ToWhereInputType(
  OmitType(Domain0006, []),
) {
  @Field(() => Int, { nullable: true })
  domain0006001From?: Maybe<number>;

  @Field(() => Int, { nullable: true })
  domain0006001To?: Maybe<number>;

  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0006>> {
    const { domain0006001From, domain0006001To, ...where } =
      super.toFindOptionsWhere() as this;

    return {
      ...where,
      domain0006001: Between(domain0006001From, domain0006001To),
    };
  }
}
