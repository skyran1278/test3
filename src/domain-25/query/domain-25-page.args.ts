import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain25OrderInput } from './domain-25-order.input';
import { Domain25WhereInput } from './domain-25-where.input';

@ArgsType()
export class Domain25PageArgs extends NodePageArgs {
  @TypeField(() => Domain25OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain25OrderInput(),
  })
  order: Domain25OrderInput = new Domain25OrderInput();

  @TypeField(() => [Domain25WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain25WhereInput[]>;
}
