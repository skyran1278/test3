import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain21OrderInput } from './domain-21-order.input';
import { Domain21WhereInput } from './domain-21-where.input';

@ArgsType()
export class Domain21PageArgs extends NodePageArgs {
  @TypeField(() => Domain21OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain21OrderInput(),
  })
  order: Domain21OrderInput = new Domain21OrderInput();

  @TypeField(() => [Domain21WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain21WhereInput[]>;
}
