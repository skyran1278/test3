import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain10Input {
  @Field(() => ID)
  id!: string;
}
