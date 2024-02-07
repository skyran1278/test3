import { InputType } from '@nestjs/graphql';
import { PartialAndOmitType } from 'src/common/partial-and-omit-type';
import { Nullable } from 'src/common/repo.proxy';
import { FindOptionsWhere } from 'typeorm';

import { User } from '../user.entity';

@InputType()
export class UserWhereInput extends PartialAndOmitType(User, []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<User>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
