import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { NonNegativeIntResolver } from 'graphql-scalars';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain1OrderInput } from './domain1-order.input';
import { Domain1WhereInput } from './domain1-where.input';

@ArgsType()
export class Domain1PageArgs {
  @Field(() => NonNegativeIntResolver, {
    description: 'Maximum amount of nodes in this page',
    nullable: true,
  })
  take?: Maybe<number>;

  @Field(() => NonNegativeIntResolver, {
    description: 'Amount of nodes to skip from the beginning of this page',
    nullable: true,
  })
  skip?: Maybe<number>;

  @ValidateNested()
  @Type(() => Domain1OrderInput)
  @Field(() => Domain1OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain1OrderInput(),
  })
  order: Domain1OrderInput = new Domain1OrderInput();

  @ValidateNested()
  @Type(() => Domain1WhereInput)
  @Field(() => Domain1WhereInput, {
    description: '查詢條件',
    defaultValue: new Domain1WhereInput(),
  })
  where: Domain1WhereInput = new Domain1WhereInput();
}
