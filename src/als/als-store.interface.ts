import { AuditLog } from '../audit-log/audit-log.entity';
import { CaslAbility, CaslRules } from '../casl/casl-ability.factory';
import { User } from '../user/user.entity';

export interface AlsStore {
  requestId: string;
  user: User;
  rules: CaslRules;
  ability: CaslAbility;
  input: string;
  auditLogs?: AuditLog[];
}
