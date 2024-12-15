import { ArgsType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { Domain01WhereInput } from './domain-01-where.input';

@ArgsType()
export class Domain01Args {
  @TypeField(() => [Domain01WhereInput], {
    description: '查詢條件',
    defaultValue: [],
  })
  where: Domain01WhereInput[] = [];
}
