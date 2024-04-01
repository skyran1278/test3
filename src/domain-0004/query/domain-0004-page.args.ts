import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain0004OrderInput } from './domain-0004-order.input';
import { Domain0004WhereInput } from './domain-0004-where.input';

@ArgsType()
export class Domain0004PageArgs extends NodePageArgs {
  @TypeField(() => Domain0004OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0004OrderInput(),
  })
  order: Domain0004OrderInput = new Domain0004OrderInput();

  @TypeField(() => [Domain0004WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0004WhereInput[]>;
}
