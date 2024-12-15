import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain08Input {
  @Field(() => ID)
  id!: string;
}
