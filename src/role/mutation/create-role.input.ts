import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Role } from '../role.entity';

@InputType()
export class CreateRoleInput extends OmitType(
  ToCreateInputType(Role),
  [],
) {}
