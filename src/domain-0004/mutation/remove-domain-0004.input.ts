import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0004Input {
  @Field(() => ID)
  id!: string;
}
