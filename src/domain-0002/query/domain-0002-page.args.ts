import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain0002OrderInput } from './domain-0002-order.input';
import { Domain0002WhereInput } from './domain-0002-where.input';

@ArgsType()
export class Domain0002PageArgs extends NodePageArgs {
  @TypeField(() => Domain0002OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0002OrderInput(),
  })
  order: Domain0002OrderInput = new Domain0002OrderInput();

  @TypeField(() => [Domain0002WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0002WhereInput[]>;
}
