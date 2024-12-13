import { ArgsType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { Domain0001WhereInput } from './domain-0001-where.input';

@ArgsType()
export class Domain0001Args {
  @TypeField(() => [Domain0001WhereInput], {
    description: '查詢條件',
    defaultValue: [],
  })
  where: Domain0001WhereInput[] = [];
}
