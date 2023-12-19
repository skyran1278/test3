import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveUserInput {
  @Field(() => ID)
  id!: string;
}
