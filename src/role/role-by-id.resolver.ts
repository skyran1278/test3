import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { RoleByIdLoader } from './role-by-id.loader';
import { Role } from './role.entity';
import { RoleById } from './query/role-by-id.type';

@Resolver(() => RoleById)
export class RoleByIdResolver {
  constructor(private readonly loader: RoleByIdLoader) {}

  @ResolveField(() => Role, { nullable: true })
  async role(
    @Parent() { roleId, role }: RoleById,
  ): Promise<Maybe<Role>> {
    if (role) return role;
    if (roleId) return this.loader.load(roleId);
    return null;
  }
}
