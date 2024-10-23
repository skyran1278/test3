import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0010 } from './domain-0010.entity';

@Injectable()
export class Domain0010Repository extends BaseRepository<Domain0010> {
  constructor(readonly manager: EntityManager) {
    super(Domain0010, manager);
  }
}
