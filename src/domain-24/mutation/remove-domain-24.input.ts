import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain24Input {
  @Field(() => ID)
  id!: string;
}
