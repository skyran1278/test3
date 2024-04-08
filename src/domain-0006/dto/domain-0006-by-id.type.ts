import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0006 } from '../domain-0006.entity';

@InterfaceType()
export abstract class Domain0006ById {
  @Field(() => ID, { nullable: true })
  domain0006Id?: Maybe<string>;

  @Field(() => Domain0006, { nullable: true })
  domain0006?: Maybe<Domain0006>;
}
