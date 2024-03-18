import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { NodePageArgs } from 'src/common/node.page.args';

import { Maybe } from 'graphql/jsutils/Maybe';
import { TypeField } from 'src/common/type-field.decorator';
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

  @TypeField(() => [UserWhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<UserWhereInput[]>;
}
