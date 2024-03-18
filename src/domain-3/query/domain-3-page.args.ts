import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain3OrderInput } from './domain-3-order.input';
import { Domain3WhereInput } from './domain-3-where.input';

@ArgsType()
export class Domain3PageArgs extends NodePageArgs {
  @TypeField(() => Domain3OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain3OrderInput(),
  })
  order: Domain3OrderInput = new Domain3OrderInput();

  @TypeField(() => Domain3WhereInput, {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain3WhereInput[]>;
}
