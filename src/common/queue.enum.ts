import { registerEnumType } from '@nestjs/graphql';

export enum QueueEnum {
  AUDIT_LOG = 'AUDIT_LOG',
  DOMAIN0015 = 'DOMAIN0015',
}

registerEnumType(QueueEnum, {
  name: 'QueueEnum',
  description: 'Queue name',
  valuesMap: {
    AUDIT_LOG: {
      description: 'AUDIT_LOG',
    },
    DOMAIN0015: {
      description: 'DOMAIN0015',
    },
  },
});
