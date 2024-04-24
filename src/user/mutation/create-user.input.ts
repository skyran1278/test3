import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { User } from '../user.entity';

@InputType()
export class CreateUserInput extends OmitType(ToCreateInputType(User), []) {}
