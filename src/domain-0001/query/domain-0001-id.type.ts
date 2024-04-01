import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001 } from '../domain-0001.entity';

@InterfaceType()
export abstract class Domain0001Id {
  @Field(() => ID, { nullable: true })
  domain0001Id?: Maybe<string>;

  @Field(() => Domain0001, { nullable: true })
  domain0001?: Maybe<Domain0001>;
}
