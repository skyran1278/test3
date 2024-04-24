import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0010OrderInput } from './domain-0010-order.input';
import { Domain0010WhereInput } from './domain-0010-where.input';

@ArgsType()
export class Domain0010PageArgs extends NodePageArgs {
  @TypeField(() => Domain0010OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0010OrderInput(),
  })
  order: Domain0010OrderInput = new Domain0010OrderInput();

  @TypeField(() => [Domain0010WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0010WhereInput[]>;
}
