import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain01Input {
  @Field(() => ID)
  id!: string;
}
