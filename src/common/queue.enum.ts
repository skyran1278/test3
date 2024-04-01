import { registerEnumType } from '@nestjs/graphql';

export enum QueueEnum {
  DOMAIN0015 = 'DOMAIN0015',
}

registerEnumType(QueueEnum, {
  name: 'QueueEnum',
  description: 'Queue name',
  valuesMap: {
    DOMAIN0015: {
      description: 'DOMAIN0015',
    },
  },
});
