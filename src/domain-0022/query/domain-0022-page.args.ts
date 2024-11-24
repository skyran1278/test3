import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0022OrderInput } from './domain-0022-order.input';
import { Domain0022WhereInput } from './domain-0022-where.input';

@ArgsType()
export class Domain0022PageArgs extends NodePageArgs {
  @TypeField(() => Domain0022OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0022OrderInput(),
  })
  order: Domain0022OrderInput = new Domain0022OrderInput();

  @TypeField(() => [Domain0022WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0022WhereInput[]>;
}
