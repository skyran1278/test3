import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain1Input {
  @Field(() => ID)
  id!: string;
}
