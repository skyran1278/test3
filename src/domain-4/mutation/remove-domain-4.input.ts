import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain4Input {
  @Field(() => ID)
  id!: string;
}
