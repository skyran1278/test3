import { registerEnumType } from '@nestjs/graphql';

export enum Domain15JobEnum {
  CREATE_DOMAIN15_JOB = 'CREATE_DOMAIN15_JOB',
}

registerEnumType(Domain15JobEnum, {
  name: 'Domain15JobEnum',
  description: 'Domain15JobEnum',
  valuesMap: {
    CREATE_DOMAIN15_JOB: {
      description: 'CREATE_DOMAIN15_JOB',
    },
  },
});
