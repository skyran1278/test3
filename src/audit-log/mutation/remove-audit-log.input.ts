import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveAuditLogInput {
  @Field(() => ID)
  id!: string;
}
