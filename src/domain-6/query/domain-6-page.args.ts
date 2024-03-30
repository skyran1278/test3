import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain6OrderInput } from './domain-6-order.input';
import { Domain6WhereInput } from './domain-6-where.input';

@ArgsType()
export class Domain6PageArgs extends NodePageArgs {
  @TypeField(() => Domain6OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain6OrderInput(),
  })
  order: Domain6OrderInput = new Domain6OrderInput();

  @TypeField(() => [Domain6WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain6WhereInput[]>;
}
