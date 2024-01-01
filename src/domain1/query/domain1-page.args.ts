import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { NodePageArgs } from 'src/common/query/node.page.args';

import { Domain1OrderInput } from './domain1-order.input';
import { Domain1WhereInput } from './domain1-where.input';

@ArgsType()
export class Domain1PageArgs extends NodePageArgs {
  @ValidateNested()
  @Type(() => Domain1OrderInput)
  @Field(() => Domain1OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain1OrderInput(),
  })
  order: Domain1OrderInput = new Domain1OrderInput();

  @ValidateNested()
  @Type(() => Domain1WhereInput)
  @Field(() => Domain1WhereInput, {
    description: '查詢條件',
    defaultValue: new Domain1WhereInput(),
  })
  where: Domain1WhereInput = new Domain1WhereInput();
}
