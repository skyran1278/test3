import { InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/dao/repo.proxy';
import { ToWhereInputType } from 'src/common/graphql/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { User } from '../user.entity';

@InputType()
export class UserWhereInput extends ToWhereInputType(User) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<User>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
