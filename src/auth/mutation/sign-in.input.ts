import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field(() => Int, { description: 'user001' })
  user001!: number;

  @Field(() => Int, { description: 'user002' })
  user002!: number;
}
