import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain6Input {
  @Field(() => ID)
  id!: string;
}
