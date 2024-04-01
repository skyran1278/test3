import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0001Input {
  @Field(() => ID)
  id!: string;
}
