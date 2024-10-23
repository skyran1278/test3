import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Role } from './role.entity';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(readonly manager: EntityManager) {
    super(Role, manager);
  }
}
