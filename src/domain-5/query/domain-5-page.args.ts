import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain5OrderInput } from './domain-5-order.input';
import { Domain5WhereInput } from './domain-5-where.input';

@ArgsType()
export class Domain5PageArgs extends NodePageArgs {
  @TypeField(() => Domain5OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain5OrderInput(),
  })
  order: Domain5OrderInput = new Domain5OrderInput();

  @TypeField(() => [Domain5WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain5WhereInput[]>;
}
