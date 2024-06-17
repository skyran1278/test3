import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Permission } from './permission.entity';
import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';
import { CreatePermissionInput } from './mutation/create-permission.input';
import { CreatePermissionOutput } from './mutation/create-permission.output';
import { RemovePermissionInput } from './mutation/remove-permission.input';
import { RemovePermissionOutput } from './mutation/remove-permission.output';
import { UpdatePermissionInput } from './mutation/update-permission.input';
import { UpdatePermissionOutput } from './mutation/update-permission.output';
import { PermissionPageArgs } from './query/permission-page.args';
import { PermissionPage } from './query/permission-page.type';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly permissionService: PermissionService,
  ) {}

  @Transactional()
  @Mutation(() => CreatePermissionOutput)
  async createPermission(
    @Args('input') input: CreatePermissionInput,
  ): Promise<CreatePermissionOutput> {
    const permission = await this.permissionService.saveOne(input);
    return { permission };
  }

  @Transactional()
  @Query(() => PermissionPage)
  permissionPage(@Args() args: PermissionPageArgs): Promise<PermissionPage> {
    return this.permissionService.findPage(args);
  }

  @Transactional()
  @Query(() => Permission)
  permission(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Permission>> {
    return this.permissionRepository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdatePermissionOutput)
  async updatePermission(
    @Args('input') input: UpdatePermissionInput,
  ): Promise<UpdatePermissionOutput> {
    const permission = await this.permissionService.saveOne(input);
    return { permission };
  }

  @Transactional()
  @Mutation(() => RemovePermissionOutput)
  async removePermission(
    @Args('input') input: RemovePermissionInput,
  ): Promise<RemovePermissionOutput> {
    const permission = await this.permissionService.removeOne(input.id);
    return { permission };
  }
}
