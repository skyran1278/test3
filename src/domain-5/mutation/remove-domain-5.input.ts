import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain5Input {
  @Field(() => ID)
  id!: string;
}
