import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RevertAuditLogInput {
  @Field(() => ID)
  requestId!: string;
}
