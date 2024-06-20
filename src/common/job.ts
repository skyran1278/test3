import { CaslRules } from '../security/authorization.factory';
import { User } from '../user/user.entity';

export interface JobInput {
  user: User;
  rules: CaslRules;
}
