import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { CreateRoleInput } from './mutation/create-role.input';
import { CreateRoleOutput } from './mutation/create-role.output';
import { RemoveRoleInput } from './mutation/remove-role.input';
import { RemoveRoleOutput } from './mutation/remove-role.output';
import { UpdateRoleInput } from './mutation/update-role.input';
import { UpdateRoleOutput } from './mutation/update-role.output';
import { RolePageArgs } from './query/role-page.args';
import { RolePage } from './query/role-page.type';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly roleService: RoleService,
  ) {}

  @Transactional()
  @Mutation(() => CreateRoleOutput)
  async createRole(
    @Args('input') input: CreateRoleInput,
  ): Promise<CreateRoleOutput> {
    const role = await this.roleService.saveOne(input);
    return { role };
  }

  @Transactional()
  @Query(() => RolePage)
  rolePage(@Args() args: RolePageArgs): Promise<RolePage> {
    return this.roleService.findPage(args);
  }

  @Transactional()
  @Query(() => Role)
  role(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Role>> {
    return this.roleRepository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateRoleOutput)
  async updateRole(
    @Args('input') input: UpdateRoleInput,
  ): Promise<UpdateRoleOutput> {
    const role = await this.roleService.saveOne(input);
    return { role };
  }

  @Transactional()
  @Mutation(() => RemoveRoleOutput)
  async removeRole(
    @Args('input') input: RemoveRoleInput,
  ): Promise<RemoveRoleOutput> {
    const role = await this.roleService.removeOne(input.id);
    return { role };
  }
}
