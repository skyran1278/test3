import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain08 } from './domain-08.entity';

@Injectable()
export class Domain08Repository extends BaseRepository<Domain08> {
  constructor(readonly manager: EntityManager) {
    super(Domain08, manager);
  }
}
