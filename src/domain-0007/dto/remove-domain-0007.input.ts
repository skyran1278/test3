import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0007Input {
  @Field(() => ID)
  id!: string;
}
