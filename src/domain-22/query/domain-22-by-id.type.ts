import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain22 } from '../domain-22.entity';

@InterfaceType()
export abstract class Domain22ById {
  @Field(() => ID, { nullable: true })
  domain22Id?: Maybe<string>;

  @Field(() => Domain22, { nullable: true })
  domain22?: Maybe<Domain22>;
}
