import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class SoftRemoveDomain0005Input {
  @Field(() => ID)
  id!: string;
}
