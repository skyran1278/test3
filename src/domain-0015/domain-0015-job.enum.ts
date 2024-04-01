import { registerEnumType } from '@nestjs/graphql';

export enum Domain0015JobEnum {
  CREATE_DOMAIN0015_JOB = 'CREATE_DOMAIN0015_JOB',
}

registerEnumType(Domain0015JobEnum, {
  name: 'Domain0015JobEnum',
  description: 'Domain0015JobEnum',
  valuesMap: {
    CREATE_DOMAIN0015_JOB: {
      description: 'CREATE_DOMAIN0015_JOB',
    },
  },
});
