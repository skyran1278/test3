import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { CreatePermissionInput } from './mutation/create-permission.input';
import { UpdatePermissionInput } from './mutation/update-permission.input';
import { Permission } from './permission.entity';
import { PermissionRepository } from './permission.repository';
import { PermissionPageArgs } from './query/permission-page.args';

@Injectable()
export class PermissionService {
  constructor(private readonly repo: PermissionRepository) {}

  @Transactional()
  async saveOne(
    input: CreatePermissionInput | UpdatePermissionInput,
  ): Promise<Permission> {
    const permission = this.repo.create(input);
    await this.repo.save(permission);

    return permission;
  }

  @Transactional()
  findPage(args: PermissionPageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const permission = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(permission);
  }
}
