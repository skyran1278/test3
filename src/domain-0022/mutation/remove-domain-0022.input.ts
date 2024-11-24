import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0022Input {
  @Field(() => ID)
  id!: string;
}
