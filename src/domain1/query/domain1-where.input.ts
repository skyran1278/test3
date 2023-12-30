import { InputType } from '@nestjs/graphql';
import { PartialAndOmitType } from 'src/common/partial-and-omit-type';

import { Domain1 } from '../domain1.entity';

@InputType()
export class Domain1WhereInput extends PartialAndOmitType(Domain1, []) {}
