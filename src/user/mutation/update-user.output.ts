import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../user.entity';

@ObjectType()
export class UpdateUserOutput {
  @Field(() => User)
  user!: User;
}
