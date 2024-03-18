import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain2OrderInput } from './domain-2-order.input';
import { Domain2WhereInput } from './domain-2-where.input';

@ArgsType()
export class Domain2PageArgs extends NodePageArgs {
  @TypeField(() => Domain2OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain2OrderInput(),
  })
  order: Domain2OrderInput = new Domain2OrderInput();

  @TypeField(() => Domain2WhereInput, {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain2WhereInput[]>;
}
