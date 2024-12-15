import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain10 } from '../domain-10.entity';

@InterfaceType()
export abstract class Domain10ById {
  @Field(() => ID, { nullable: true })
  domain10Id?: Maybe<string>;

  @Field(() => Domain10, { nullable: true })
  domain10?: Maybe<Domain10>;
}
