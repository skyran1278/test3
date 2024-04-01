import { Maybe } from 'graphql/jsutils/Maybe';
import { User } from 'src/user/user.entity';

import { Domain0015 } from './domain-0015.entity';

export interface CreateDomain0015JobInput {
  input: {
    domain0015001?: Maybe<number>;
  };
  user: User;
}

export interface CreateDomain0015JobOutput {
  domain0015: Domain0015;
}
