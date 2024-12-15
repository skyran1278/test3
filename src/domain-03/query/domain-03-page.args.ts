import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain03OrderInput } from './domain-03-order.input';
import { Domain03WhereInput } from './domain-03-where.input';

@ArgsType()
export class Domain03PageArgs extends NodePageArgs {
  @TypeField(() => Domain03OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain03OrderInput(),
  })
  order: Domain03OrderInput = new Domain03OrderInput();

  @TypeField(() => [Domain03WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain03WhereInput[]>;
}
