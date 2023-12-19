import { registerEnumType } from '@nestjs/graphql';

export enum NodeOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(NodeOrderEnum, {
  name: 'NodeOrderEnum',
  description: '排序方式',
  valuesMap: {
    ASC: { description: '升冪' },
    DESC: { description: '降冪' },
  },
});
