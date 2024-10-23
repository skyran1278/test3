import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0008 } from './domain-0008.entity';

@Injectable()
export class Domain0008Repository extends BaseRepository<Domain0008> {
  constructor(readonly manager: EntityManager) {
    super(Domain0008, manager);
  }
}
