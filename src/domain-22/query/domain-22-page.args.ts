import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain22OrderInput } from './domain-22-order.input';
import { Domain22WhereInput } from './domain-22-where.input';

@ArgsType()
export class Domain22PageArgs extends NodePageArgs {
  @TypeField(() => Domain22OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain22OrderInput(),
  })
  order: Domain22OrderInput = new Domain22OrderInput();

  @TypeField(() => [Domain22WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain22WhereInput[]>;
}
