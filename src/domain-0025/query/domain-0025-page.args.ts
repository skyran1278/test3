import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0025OrderInput } from './domain-0025-order.input';
import { Domain0025WhereInput } from './domain-0025-where.input';

@ArgsType()
export class Domain0025PageArgs extends NodePageArgs {
  @TypeField(() => Domain0025OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0025OrderInput(),
  })
  order: Domain0025OrderInput = new Domain0025OrderInput();

  @TypeField(() => [Domain0025WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0025WhereInput[]>;
}
