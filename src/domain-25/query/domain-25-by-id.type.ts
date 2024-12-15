import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain25 } from '../domain-25.entity';

@InterfaceType()
export abstract class Domain25ById {
  @Field(() => ID, { nullable: true })
  domain25Id?: Maybe<string>;

  @Field(() => Domain25, { nullable: true })
  domain25?: Maybe<Domain25>;
}
