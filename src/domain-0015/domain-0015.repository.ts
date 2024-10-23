import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0015 } from './domain-0015.entity';

@Injectable()
export class Domain0015Repository extends BaseRepository<Domain0015> {
  constructor(readonly manager: EntityManager) {
    super(Domain0015, manager);
  }
}
