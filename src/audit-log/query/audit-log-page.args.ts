import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { AuditLogOrderInput } from './audit-log-order.input';
import { AuditLogWhereInput } from './audit-log-where.input';

@ArgsType()
export class AuditLogPageArgs extends NodePageArgs {
  @TypeField(() => AuditLogOrderInput, {
    description: '排序欄位與方式',
    defaultValue: new AuditLogOrderInput(),
  })
  order: AuditLogOrderInput = new AuditLogOrderInput();

  @TypeField(() => [AuditLogWhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<AuditLogWhereInput[]>;
}
