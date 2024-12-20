import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { CreateRoleInput } from './mutation/create-role.input';
import { UpdateRoleInput } from './mutation/update-role.input';
import { RolePageArgs } from './query/role-page.args';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repo: RoleRepository) {}

  @Transactional()
  async saveOne(input: CreateRoleInput | UpdateRoleInput): Promise<Role> {
    const role = this.repo.create(input);
    await this.repo.save(role);

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
