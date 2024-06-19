import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Role } from './role.entity';
import { RoleRepository } from './role.repository';
import { CreateRoleInput } from './mutation/create-role.input';
import { UpdateRoleInput } from './mutation/update-role.input';
import { RolePageArgs } from './query/role-page.args';

@Injectable()
export class RoleService {
  constructor(private readonly repo: RoleRepository) {}

  @Transactional()
  async saveOne(
    input: CreateRoleInput | UpdateRoleInput,
  ): Promise<Role> {
    const role = await this.repo.save(input);

    return role;
  }

  @Transactional()
  findPage(args: RolePageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const role = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(role);
  }
}
