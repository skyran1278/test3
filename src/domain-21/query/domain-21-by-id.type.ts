import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain21 } from '../domain-21.entity';

@InterfaceType()
export abstract class Domain21ById {
  @Field(() => ID, { nullable: true })
  domain21Id?: Maybe<string>;

  @Field(() => Domain21, { nullable: true })
  domain21?: Maybe<Domain21>;
}
