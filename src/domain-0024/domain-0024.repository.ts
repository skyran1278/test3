import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0024 } from './domain-0024.entity';

@Injectable()
export class Domain0024Repository extends BaseRepository<Domain0024> {
  constructor(readonly manager: EntityManager) {
    super(Domain0024, manager);
  }
}
