import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain3Input {
  @Field(() => ID)
  id!: string;
}
