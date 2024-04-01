import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain0001OrderInput } from './domain-0001-order.input';
import { Domain0001WhereInput } from './domain-0001-where.input';

@ArgsType()
export class Domain0001PageArgs extends NodePageArgs {
  @TypeField(() => Domain0001OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0001OrderInput(),
  })
  order: Domain0001OrderInput = new Domain0001OrderInput();

  @TypeField(() => [Domain0001WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0001WhereInput[]>;
}
