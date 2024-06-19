import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { PermissionByIdLoader } from './permission-by-id.loader';
import { Permission } from './permission.entity';
import { PermissionById } from './query/permission-by-id.type';

@Resolver(() => PermissionById)
export class PermissionByIdResolver {
  constructor(private readonly loader: PermissionByIdLoader) {}

  @ResolveField(() => Permission, { nullable: true })
  async permission(
    @Parent() { permissionId, permission }: PermissionById,
  ): Promise<Maybe<Permission>> {
    if (permission) return permission;
    if (permissionId) return this.loader.load(permissionId);
    return null;
  }
}
