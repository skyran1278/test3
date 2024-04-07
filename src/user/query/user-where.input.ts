import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { User } from '../user.entity';

@InputType()
export class UserWhereInput extends OmitType(ToWhereInputType(User), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<User>> {
    const { ...where } = this;
    return { ...where };
  }
}
