import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0011Input {
  @Field(() => ID)
  id!: string;
}
