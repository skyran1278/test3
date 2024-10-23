import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { TreeBaseRepository } from '../common/tree-base.repository';
import { Domain0021 } from './domain-0021.entity';

@Injectable()
export class Domain0021Repository extends TreeBaseRepository<Domain0021> {
  constructor(readonly manager: EntityManager) {
    super(Domain0021, manager);
  }
}
