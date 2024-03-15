import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain1 } from '../domain-1.entity';

@InterfaceType()
export abstract class Domain1Id {
  @Field(() => ID, { nullable: true })
  domain1Id?: Maybe<string>;

  @Field(() => Domain1, { nullable: true })
  domain1?: Maybe<Domain1>;
}
