import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RemoveDomain1Input {
  @Field(() => Int)
  id!: number;
}
