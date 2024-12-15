import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain03 } from '../domain-03.entity';

@InterfaceType()
export abstract class Domain03ById {
  @Field(() => ID, { nullable: true })
  domain03Id?: Maybe<string>;

  @Field(() => Domain03, { nullable: true })
  domain03?: Maybe<Domain03>;
}
