import { Field, ObjectType } from '@nestjs/graphql';

import { Role } from '../role.entity';

@ObjectType()
export class CreateRoleOutput {
  @Field(() => Role)
  role!: Role;
}
