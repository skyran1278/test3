import { AuditLog } from '../audit-log/audit-log.entity';
import { CaslAbility, CaslRules } from '../security/authorization.factory';
import { User } from '../user/user.entity';

export interface AlsStore {
  requestId: string;
  input: string;
  user?: User;
  rules?: CaslRules;
  ability?: CaslAbility;
  noAuthentication?: boolean;
  noAuthorization?: boolean;
  auditLogs?: AuditLog[];
}
