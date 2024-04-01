import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0011 } from '../domain-0011.entity';

@InterfaceType()
export abstract class Domain0011Id {
  @Field(() => ID, { nullable: true })
  domain0011Id?: Maybe<string>;

  @Field(() => Domain0011, { nullable: true })
  domain0011?: Maybe<Domain0011>;
}
