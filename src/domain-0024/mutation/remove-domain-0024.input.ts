import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0024Input {
  @Field(() => ID)
  id!: string;
}
