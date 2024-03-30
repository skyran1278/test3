import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain6 } from '../domain-6.entity';

@InterfaceType()
export abstract class Domain6Id {
  @Field(() => ID, { nullable: true })
  domain6Id?: Maybe<string>;

  @Field(() => Domain6, { nullable: true })
  domain6?: Maybe<Domain6>;
}
