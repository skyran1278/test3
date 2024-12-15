import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain21Input {
  @Field(() => ID)
  id!: string;
}
