import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  constructor(readonly manager: EntityManager) {
    super(Permission, manager);
  }
}
