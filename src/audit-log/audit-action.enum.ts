import { registerEnumType } from '@nestjs/graphql';

export enum AuditActionEnum {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  REMOVE = 'REMOVE',
  SOFT_REMOVE = 'SOFT_REMOVE',
  RECOVER = 'RECOVER',
}

registerEnumType(AuditActionEnum, {
  name: 'AuditActionEnum',
  description: 'AuditActionEnum',
});
