import { ArgsType, Field } from '@nestjs/graphql';
import { NonNegativeIntResolver } from 'graphql-scalars';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain2OrderInput } from './domain2-order.input';
import { Domain2WhereInput } from './domain2-where.input';

@ArgsType()
export class Domain2PageArgs {
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

  @Field(() => Domain2OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain2OrderInput(),
  })
  order: Domain2OrderInput = new Domain2OrderInput();

  @Field(() => Domain2WhereInput, {
    description: '查詢條件',
    defaultValue: new Domain2WhereInput(),
  })
  where: Domain2WhereInput = new Domain2WhereInput();
}
