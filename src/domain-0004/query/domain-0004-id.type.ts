import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0004 } from '../domain-0004.entity';

@InterfaceType()
export abstract class Domain0004Id {
  @Field(() => ID, { nullable: true })
  domain0004Id?: Maybe<string>;

  @Field(() => Domain0004, { nullable: true })
  domain0004?: Maybe<Domain0004>;
}
