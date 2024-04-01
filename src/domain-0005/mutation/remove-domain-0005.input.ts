import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0005Input {
  @Field(() => ID)
  id!: string;
}