import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0009OrderInput } from './domain-0009-order.input';
import { Domain0009WhereInput } from './domain-0009-where.input';

@ArgsType()
export class Domain0009PageArgs extends NodePageArgs {
  @TypeField(() => Domain0009OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0009OrderInput(),
  })
  order: Domain0009OrderInput = new Domain0009OrderInput();

  @TypeField(() => [Domain0009WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0009WhereInput[]>;
}
