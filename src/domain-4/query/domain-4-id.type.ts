import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain4 } from '../domain-4.entity';

@InterfaceType()
export abstract class Domain4Id {
  @Field(() => ID, { nullable: true })
  domain4Id?: Maybe<string>;

  @Field(() => Domain4, { nullable: true })
  domain4?: Maybe<Domain4>;
}
