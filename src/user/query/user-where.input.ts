import { InputType } from '@nestjs/graphql';
import { PartialAndOmitType } from 'src/common/partial-and-omit-type';

import { User } from '../user.entity';

@InputType()
export class UserWhereInput extends PartialAndOmitType(User, []) {}
