import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain09OrderInput } from './domain-09-order.input';
import { Domain09WhereInput } from './domain-09-where.input';

@ArgsType()
export class Domain09PageArgs extends NodePageArgs {
  @TypeField(() => Domain09OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain09OrderInput(),
  })
  order: Domain09OrderInput = new Domain09OrderInput();

  @TypeField(() => [Domain09WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain09WhereInput[]>;
}
