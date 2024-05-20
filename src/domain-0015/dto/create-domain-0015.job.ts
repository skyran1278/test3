import { Maybe } from 'graphql/jsutils/Maybe';

import { JobInput } from '../../common/job';
import { Domain0015 } from '../domain-0015.entity';

export interface CreateDomain0015JobInput extends JobInput {
  input: {
    domain0015001?: Maybe<number>;
  };
}
export interface CreateDomain0015JobOutput {
  domain0015: Domain0015;
}
