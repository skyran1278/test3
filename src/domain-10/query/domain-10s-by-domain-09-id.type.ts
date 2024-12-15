import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain10 } from '../domain-10.entity';

@InterfaceType()
export abstract class Domain10sByDomain09Id {
  @Field(() => ID)
  id!: string;

  @Field(() => [Domain10], { nullable: true })
  domain10s?: Maybe<Domain10[]>;
}
