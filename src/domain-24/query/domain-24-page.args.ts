import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain24OrderInput } from './domain-24-order.input';
import { Domain24WhereInput } from './domain-24-where.input';

@ArgsType()
export class Domain24PageArgs extends NodePageArgs {
  @TypeField(() => Domain24OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain24OrderInput(),
  })
  order: Domain24OrderInput = new Domain24OrderInput();

  @TypeField(() => [Domain24WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain24WhereInput[]>;
}
