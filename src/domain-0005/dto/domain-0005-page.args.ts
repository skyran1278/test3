import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain0005OrderInput } from './domain-0005-order.input';
import { Domain0005WhereInput } from './domain-0005-where.input';

@ArgsType()
export class Domain0005PageArgs extends NodePageArgs {
  @TypeField(() => Domain0005OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0005OrderInput(),
  })
  order: Domain0005OrderInput = new Domain0005OrderInput();

  @TypeField(() => [Domain0005WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0005WhereInput[]>;
}
