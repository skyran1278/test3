import { JobInput } from '../../common/job';
import { AuditLog } from '../audit-log.audit-log-entity';

export interface CreateAuditLogsJobInput extends JobInput {
  input: {
    auditLogs: AuditLog[];
  };
}
export interface CreateAuditLogsJobOutput {}
