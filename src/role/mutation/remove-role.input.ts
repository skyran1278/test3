import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveRoleInput {
  @Field(() => ID)
  id!: string;
}
