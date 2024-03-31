import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain4OrderInput } from './domain-4-order.input';
import { Domain4WhereInput } from './domain-4-where.input';

@ArgsType()
export class Domain4PageArgs extends NodePageArgs {
  @TypeField(() => Domain4OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain4OrderInput(),
  })
  order: Domain4OrderInput = new Domain4OrderInput();

  @TypeField(() => [Domain4WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain4WhereInput[]>;
}
