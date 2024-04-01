import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0002 } from '../domain-0002.entity';

@InterfaceType()
export abstract class Domain0002Id {
  @Field(() => ID, { nullable: true })
  domain0002Id?: Maybe<string>;

  @Field(() => Domain0002, { nullable: true })
  domain0002?: Maybe<Domain0002>;
}
