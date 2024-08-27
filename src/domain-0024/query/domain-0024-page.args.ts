import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0024OrderInput } from './domain-0024-order.input';
import { Domain0024WhereInput } from './domain-0024-where.input';

@ArgsType()
export class Domain0024PageArgs extends NodePageArgs {
  @TypeField(() => Domain0024OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0024OrderInput(),
  })
  order: Domain0024OrderInput = new Domain0024OrderInput();

  @TypeField(() => [Domain0024WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0024WhereInput[]>;
}
