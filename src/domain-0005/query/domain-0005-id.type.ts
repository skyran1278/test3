import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0005 } from '../domain-0005.entity';

@InterfaceType()
export abstract class Domain0005Id {
  @Field(() => ID, { nullable: true })
  domain0005Id?: Maybe<string>;

  @Field(() => Domain0005, { nullable: true })
  domain0005?: Maybe<Domain0005>;
}
