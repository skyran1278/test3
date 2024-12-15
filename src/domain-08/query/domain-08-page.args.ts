import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain08OrderInput } from './domain-08-order.input';
import { Domain08WhereInput } from './domain-08-where.input';

@ArgsType()
export class Domain08PageArgs extends NodePageArgs {
  @TypeField(() => Domain08OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain08OrderInput(),
  })
  order: Domain08OrderInput = new Domain08OrderInput();

  @TypeField(() => [Domain08WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain08WhereInput[]>;
}
