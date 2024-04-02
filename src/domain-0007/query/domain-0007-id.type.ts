import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0007 } from '../domain-0007.entity';

@InterfaceType()
export abstract class Domain0007Id {
  @Field(() => ID, { nullable: true })
  domain0007Id?: Maybe<string>;

  @Field(() => Domain0007, { nullable: true })
  domain0007?: Maybe<Domain0007>;
}
