import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0025 } from '../domain-0025.entity';

@InterfaceType()
export abstract class Domain0025ById {
  @Field(() => ID, { nullable: true })
  domain0025Id?: Maybe<string>;

  @Field(() => Domain0025, { nullable: true })
  domain0025?: Maybe<Domain0025>;
}
