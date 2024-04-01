import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0012 } from '../domain-0012.entity';

@InterfaceType()
export abstract class Domain0012Id {
  @Field(() => ID, { nullable: true })
  domain0012Id?: Maybe<string>;

  @Field(() => Domain0012, { nullable: true })
  domain0012?: Maybe<Domain0012>;
}
