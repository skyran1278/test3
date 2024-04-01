import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0012Input {
  @Field(() => ID)
  id!: string;
}
