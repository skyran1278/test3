import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../user.entity';

@ObjectType()
export class RemoveUserOutput {
  @Field(() => User)
  user!: User;
}
