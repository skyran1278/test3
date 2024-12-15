import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain15 } from '../domain-15.entity';

@InterfaceType()
export abstract class Domain15ById {
  @Field(() => ID, { nullable: true })
  domain15Id?: Maybe<string>;

  @Field(() => Domain15, { nullable: true })
  domain15?: Maybe<Domain15>;
}
