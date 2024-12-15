import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain03Input {
  @Field(() => ID)
  id!: string;
}
