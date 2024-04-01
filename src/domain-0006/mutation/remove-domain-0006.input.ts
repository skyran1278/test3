import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0006Input {
  @Field(() => ID)
  id!: string;
}
