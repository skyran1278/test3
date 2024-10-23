import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateAuditLogInput } from './create-audit-log.input';

@InputType()
export class UpdateAuditLogInput extends OmitType(
  PartialType(CreateAuditLogInput),
  [],
) {
  @Field(() => ID)
  id!: string;
}
