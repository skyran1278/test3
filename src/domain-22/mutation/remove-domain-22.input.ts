import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain22Input {
  @Field(() => ID)
  id!: string;
}
