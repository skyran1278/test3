import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0008OrderInput } from './domain-0008-order.input';
import { Domain0008WhereInput } from './domain-0008-where.input';

@ArgsType()
export class Domain0008PageArgs extends NodePageArgs {
  @TypeField(() => Domain0008OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0008OrderInput(),
  })
  order: Domain0008OrderInput = new Domain0008OrderInput();

  @TypeField(() => [Domain0008WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0008WhereInput[]>;
}
