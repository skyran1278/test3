import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { PermissionOrderInput } from './permission-order.input';
import { PermissionWhereInput } from './permission-where.input';

@ArgsType()
export class PermissionPageArgs extends NodePageArgs {
  @TypeField(() => PermissionOrderInput, {
    description: '排序欄位與方式',
    defaultValue: new PermissionOrderInput(),
  })
  order: PermissionOrderInput = new PermissionOrderInput();

  @TypeField(() => [PermissionWhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<PermissionWhereInput[]>;
}
