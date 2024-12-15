import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain10OrderInput } from './domain-10-order.input';
import { Domain10WhereInput } from './domain-10-where.input';

@ArgsType()
export class Domain10PageArgs extends NodePageArgs {
  @TypeField(() => Domain10OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain10OrderInput(),
  })
  order: Domain10OrderInput = new Domain10OrderInput();

  @TypeField(() => [Domain10WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain10WhereInput[]>;
}
