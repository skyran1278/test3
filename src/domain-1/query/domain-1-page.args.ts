import { ArgsType } from '@nestjs/graphql';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain1OrderInput } from './domain-1-order.input';
import { Domain1WhereInput } from './domain-1-where.input';

@ArgsType()
export class Domain1PageArgs extends NodePageArgs {
  @TypeField(() => Domain1OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain1OrderInput(),
  })
  order: Domain1OrderInput = new Domain1OrderInput();

  @TypeField(() => Domain1WhereInput, {
    description: '查詢條件',
    defaultValue: new Domain1WhereInput(),
  })
  where: Domain1WhereInput = new Domain1WhereInput();
}
