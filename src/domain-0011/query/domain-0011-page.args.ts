import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain0011OrderInput } from './domain-0011-order.input';
import { Domain0011WhereInput } from './domain-0011-where.input';

@ArgsType()
export class Domain0011PageArgs extends NodePageArgs {
  @TypeField(() => Domain0011OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0011OrderInput(),
  })
  order: Domain0011OrderInput = new Domain0011OrderInput();

  @TypeField(() => [Domain0011WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0011WhereInput[]>;
}
