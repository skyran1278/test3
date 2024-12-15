import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain15OrderInput } from './domain-15-order.input';
import { Domain15WhereInput } from './domain-15-where.input';

@ArgsType()
export class Domain15PageArgs extends NodePageArgs {
  @TypeField(() => Domain15OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain15OrderInput(),
  })
  order: Domain15OrderInput = new Domain15OrderInput();

  @TypeField(() => [Domain15WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain15WhereInput[]>;
}
