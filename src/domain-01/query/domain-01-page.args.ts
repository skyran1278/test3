import { ArgsType } from '@nestjs/graphql';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain01OrderInput } from './domain-01-order.input';
import { Domain01WhereInput } from './domain-01-where.input';

@ArgsType()
export class Domain01PageArgs extends NodePageArgs {
  @TypeField(() => Domain01OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain01OrderInput(),
  })
  order: Domain01OrderInput = new Domain01OrderInput();

  @TypeField(() => [Domain01WhereInput], {
    description: '查詢條件',
    defaultValue: [],
  })
  where: Domain01WhereInput[] = [];
}
