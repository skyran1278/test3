import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { User } from '../user.entity';

@InterfaceType()
export abstract class UserId {
  @Field(() => ID, { nullable: true })
  userId?: Maybe<string>;

  @Field(() => User, { nullable: true })
  user?: Maybe<User>;
}
