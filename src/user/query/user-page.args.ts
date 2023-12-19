import { ArgsType, Field } from '@nestjs/graphql';
import { NonNegativeIntResolver } from 'graphql-scalars';
import { Maybe } from 'graphql/jsutils/Maybe';

import { UserOrderInput } from './user-order.input';
import { UserWhereInput } from './user-where.input';

@ArgsType()
export class UserPageArgs {
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

  @Field(() => UserOrderInput, {
    description: '排序欄位與方式',
    defaultValue: new UserOrderInput(),
  })
  order: UserOrderInput = new UserOrderInput();

  @Field(() => UserWhereInput, {
    description: '查詢條件',
    defaultValue: new UserWhereInput(),
  })
  where: UserWhereInput = new UserWhereInput();
}
