import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain25Input {
  @Field(() => ID)
  id!: string;
}
