import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { UserOrderInput } from './user-order.input';
import { UserWhereInput } from './user-where.input';

@ArgsType()
export class UserPageArgs extends NodePageArgs {
  @TypeField(() => UserOrderInput, {
    description: '排序欄位與方式',
    defaultValue: new UserOrderInput(),
  })
  order: UserOrderInput = new UserOrderInput();

  @TypeField(() => [UserWhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<UserWhereInput[]>;
}
