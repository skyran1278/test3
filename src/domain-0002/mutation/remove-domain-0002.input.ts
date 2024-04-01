import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0002Input {
  @Field(() => ID)
  id!: string;
}
