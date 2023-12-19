import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../user.entity';

@ObjectType()
export class CreateUserOutput {
  @Field(() => User)
  user!: User;
}
