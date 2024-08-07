import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0021OrderInput } from './domain-0021-order.input';
import { Domain0021WhereInput } from './domain-0021-where.input';

@ArgsType()
export class Domain0021PageArgs extends NodePageArgs {
  @TypeField(() => Domain0021OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0021OrderInput(),
  })
  order: Domain0021OrderInput = new Domain0021OrderInput();

  @TypeField(() => [Domain0021WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0021WhereInput[]>;
}
