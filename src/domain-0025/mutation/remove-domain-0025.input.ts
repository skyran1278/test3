import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0025Input {
  @Field(() => ID)
  id!: string;
}
