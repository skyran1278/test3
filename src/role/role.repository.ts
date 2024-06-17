import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Role } from './role.entity';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(
    @InjectRepository(Role)
    readonly repo: Repository<Role>,
  ) {
    super(repo);
  }
}
