import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain2Input {
  @Field(() => ID)
  id!: string;
}
