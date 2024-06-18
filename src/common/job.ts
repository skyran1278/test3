import { CaslRules } from '../casl/casl-ability.factory';
import { User } from '../user/user.entity';

export interface JobInput {
  user: User;
  rules: CaslRules;
}
