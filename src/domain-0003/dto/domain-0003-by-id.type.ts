import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0003 } from '../domain-0003.entity';

@InterfaceType()
export abstract class Domain0003ById {
  @Field(() => ID, { nullable: true })
  domain0003Id?: Maybe<string>;

  @Field(() => Domain0003, { nullable: true })
  domain0003?: Maybe<Domain0003>;
}
