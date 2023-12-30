import { InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/base.service';
import { PartialAndOmitType } from 'src/common/partial-and-omit-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain1 } from '../domain1.entity';

@InputType()
export class Domain1WhereInput extends PartialAndOmitType(Domain1, []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain1>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
