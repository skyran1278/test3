import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { User } from '../user.entity';

@InputType()
export class UserWhereInput extends ToWhereInputType(OmitType(User, [])) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<User>> {
    super.toFindOptionsWhere();
    const { ...where } = this;
    return { ...where };
  }
}
