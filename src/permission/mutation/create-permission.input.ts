import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Permission } from '../permission.entity';

@InputType()
export class CreatePermissionInput extends OmitType(
  ToCreateInputType(Permission),
  [],
) {}
