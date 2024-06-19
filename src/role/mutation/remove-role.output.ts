import { Field, ObjectType } from '@nestjs/graphql';

import { Role } from '../role.entity';

@ObjectType()
export class RemoveRoleOutput {
  @Field(() => Role)
  role!: Role;
}
