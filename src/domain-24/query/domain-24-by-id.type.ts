import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain24 } from '../domain-24.entity';

@InterfaceType()
export abstract class Domain24ById {
  @Field(() => ID, { nullable: true })
  domain24Id?: Maybe<string>;

  @Field(() => Domain24, { nullable: true })
  domain24?: Maybe<Domain24>;
}
