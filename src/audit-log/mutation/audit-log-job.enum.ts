import { registerEnumType } from '@nestjs/graphql';

export enum AuditLogJobEnum {
  CREATE_AUDIT_LOGS_JOB = 'CREATE_AUDIT_LOGS_JOB',
}

registerEnumType(AuditLogJobEnum, {
  name: 'AuditLogJobEnum',
  description: 'AuditLogJobEnum',
  valuesMap: {
    CREATE_AUDIT_LOGS_JOB: {
      description: 'CREATE_AUDIT_LOGS_JOB',
    },
  },
});
