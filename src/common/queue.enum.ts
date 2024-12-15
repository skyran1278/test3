import { registerEnumType } from '@nestjs/graphql';

export enum QueueEnum {
  AUDIT_LOG = 'AUDIT_LOG',
  DOMAIN15 = 'DOMAIN15',
}

registerEnumType(QueueEnum, {
  name: 'QueueEnum',
  description: 'Queue name',
  valuesMap: {
    AUDIT_LOG: {
      description: 'AUDIT_LOG',
    },
    DOMAIN15: {
      description: 'DOMAIN15',
    },
  },
});
