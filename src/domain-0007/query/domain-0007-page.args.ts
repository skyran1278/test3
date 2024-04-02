import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain0007OrderInput } from './domain-0007-order.input';
import { Domain0007WhereInput } from './domain-0007-where.input';

@ArgsType()
export class Domain0007PageArgs extends NodePageArgs {
  @TypeField(() => Domain0007OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0007OrderInput(),
  })
  order: Domain0007OrderInput = new Domain0007OrderInput();

  @TypeField(() => [Domain0007WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0007WhereInput[]>;
}
