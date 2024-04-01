import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0009 } from '../domain-0009.entity';

@InterfaceType()
export abstract class Domain0009Id {
  @Field(() => ID, { nullable: true })
  domain0009Id?: Maybe<string>;

  @Field(() => Domain0009, { nullable: true })
  domain0009?: Maybe<Domain0009>;
}
