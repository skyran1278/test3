import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { User } from '../user.entity';

@InputType()
export class UserWhereInput extends OmitType(ToWhereInputType(User), []) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<User>> {
    const { ...where } = this;
    return { ...where };
  }
}
