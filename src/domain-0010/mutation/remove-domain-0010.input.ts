import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0010Input {
  @Field(() => ID)
  id!: string;
}
