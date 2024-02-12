import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { NodePageArgs } from 'src/common/graphql/node.page.args';

import { UserOrderInput } from './user-order.input';
import { UserWhereInput } from './user-where.input';

@ArgsType()
export class UserPageArgs extends NodePageArgs {
  @ValidateNested()
  @Type(() => UserOrderInput)
  @Field(() => UserOrderInput, {
    description: '排序欄位與方式',
    defaultValue: new UserOrderInput(),
  })
  order: UserOrderInput = new UserOrderInput();

  @ValidateNested()
  @Type(() => UserWhereInput)
  @Field(() => UserWhereInput, {
    description: '查詢條件',
    defaultValue: new UserWhereInput(),
  })
  where: UserWhereInput = new UserWhereInput();
}
