import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain5 } from '../domain-5.entity';

@InterfaceType()
export abstract class Domain5Id {
  @Field(() => ID, { nullable: true })
  domain5Id?: Maybe<string>;

  @Field(() => Domain5, { nullable: true })
  domain5?: Maybe<Domain5>;
}
