import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain01 } from '../domain-01.entity';

@InterfaceType()
export abstract class Domain01ById {
  @Field(() => ID, { nullable: true })
  domain01Id?: Maybe<string>;

  @Field(() => Domain01, { nullable: true })
  domain01?: Maybe<Domain01>;
}
