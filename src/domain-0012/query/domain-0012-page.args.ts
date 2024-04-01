import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain0012OrderInput } from './domain-0012-order.input';
import { Domain0012WhereInput } from './domain-0012-where.input';

@ArgsType()
export class Domain0012PageArgs extends NodePageArgs {
  @TypeField(() => Domain0012OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0012OrderInput(),
  })
  order: Domain0012OrderInput = new Domain0012OrderInput();

  @TypeField(() => [Domain0012WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0012WhereInput[]>;
}
