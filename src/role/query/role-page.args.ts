import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { RoleOrderInput } from './role-order.input';
import { RoleWhereInput } from './role-where.input';

@ArgsType()
export class RolePageArgs extends NodePageArgs {
  @TypeField(() => RoleOrderInput, {
    description: '排序欄位與方式',
    defaultValue: new RoleOrderInput(),
  })
  order: RoleOrderInput = new RoleOrderInput();

  @TypeField(() => [RoleWhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<RoleWhereInput[]>;
}
