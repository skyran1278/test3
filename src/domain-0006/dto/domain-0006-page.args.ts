import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0006OrderInput } from './domain-0006-order.input';
import { Domain0006WhereInput } from './domain-0006-where.input';

@ArgsType()
export class Domain0006PageArgs extends NodePageArgs {
  @TypeField(() => Domain0006OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0006OrderInput(),
  })
  order: Domain0006OrderInput = new Domain0006OrderInput();

  @TypeField(() => [Domain0006WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0006WhereInput[]>;
}
