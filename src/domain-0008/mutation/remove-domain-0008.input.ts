import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0008Input {
  @Field(() => ID)
  id!: string;
}
