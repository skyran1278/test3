import { AuditLog } from '../audit-log/audit-log.entity';
import { User } from '../user/user.entity';

export interface AlsStore {
  requestId: string;
  user: User;
  input: string;
  auditLogs?: AuditLog[];
}
