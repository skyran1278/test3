import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0022 } from '../domain-0022.entity';

@InterfaceType()
export abstract class Domain0022ById {
  @Field(() => ID, { nullable: true })
  domain0022Id?: Maybe<string>;

  @Field(() => Domain0022, { nullable: true })
  domain0022?: Maybe<Domain0022>;
}
