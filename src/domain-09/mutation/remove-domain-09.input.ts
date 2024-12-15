import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain09Input {
  @Field(() => ID)
  id!: string;
}
