import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain08 } from '../domain-08.entity';

@InterfaceType()
export abstract class Domain08ById {
  @Field(() => ID, { nullable: true })
  domain08Id?: Maybe<string>;

  @Field(() => Domain08, { nullable: true })
  domain08?: Maybe<Domain08>;
}
