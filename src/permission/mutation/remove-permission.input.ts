import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemovePermissionInput {
  @Field(() => ID)
  id!: string;
}
