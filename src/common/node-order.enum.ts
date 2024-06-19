import { registerEnumType } from '@nestjs/graphql';

export enum NodeOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(NodeOrderEnum, {
  name: 'NodeOrderEnum',
  description: '排序方式',
  valuesMap: {
    ASC: { description: '升冪' },
    DESC: { description: '降冪' },
  },
});
