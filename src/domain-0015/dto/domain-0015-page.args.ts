import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain0015OrderInput } from './domain-0015-order.input';
import { Domain0015WhereInput } from './domain-0015-where.input';

@ArgsType()
export class Domain0015PageArgs extends NodePageArgs {
  @TypeField(() => Domain0015OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0015OrderInput(),
  })
  order: Domain0015OrderInput = new Domain0015OrderInput();

  @TypeField(() => [Domain0015WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0015WhereInput[]>;
}
