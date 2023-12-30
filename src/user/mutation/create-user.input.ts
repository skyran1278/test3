import { InputType } from '@nestjs/graphql';
import { OmitMetaEntityType } from 'src/common/omit-meta-entity-type';

import { User } from '../user.entity';

@InputType()
export class CreateUserInput extends OmitMetaEntityType(User, []) {}
