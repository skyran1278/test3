import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain15 } from './domain-15.entity';

@Injectable()
export class Domain15Repository extends BaseRepository<Domain15> {
  constructor(readonly manager: EntityManager) {
    super(Domain15, manager);
  }
}
