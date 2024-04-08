import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain0003OrderInput } from './domain-0003-order.input';
import { Domain0003WhereInput } from './domain-0003-where.input';

@ArgsType()
export class Domain0003PageArgs extends NodePageArgs {
  @TypeField(() => Domain0003OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0003OrderInput(),
  })
  order: Domain0003OrderInput = new Domain0003OrderInput();

  @TypeField(() => [Domain0003WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0003WhereInput[]>;
}
