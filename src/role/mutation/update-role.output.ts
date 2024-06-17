import { Field, ObjectType } from '@nestjs/graphql';

import { Role } from '../role.entity';

@ObjectType()
export class UpdateRoleOutput {
  @Field(() => Role)
  role!: Role;
}
