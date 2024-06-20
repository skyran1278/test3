import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0003Input {
  @Field(() => ID)
  id!: string;
}
