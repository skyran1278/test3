import { Maybe } from 'graphql/jsutils/Maybe';

import { JobInput } from '../../common/job';
import { Domain15 } from '../domain-15.entity';

export interface CreateDomain15JobInput extends JobInput {
  input: {
    domain1501?: Maybe<number>;
  };
}
export interface CreateDomain15JobOutput {
  domain15: Domain15;
}
