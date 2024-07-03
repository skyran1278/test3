import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0021Input {
  @Field(() => ID)
  id!: string;
}
