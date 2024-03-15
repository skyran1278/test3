import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain3 } from '../domain-3.entity';

@InterfaceType()
export abstract class Domain3Id {
  @Field(() => ID, { nullable: true })
  domain3Id?: Maybe<string>;

  @Field(() => Domain3, { nullable: true })
  domain3?: Maybe<Domain3>;
}
