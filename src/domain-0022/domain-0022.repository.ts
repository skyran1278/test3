import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { TreeBaseRepository } from '../common/tree-base.repository';
import { Domain0022 } from './domain-0022.entity';

@Injectable()
export class Domain0022Repository extends TreeBaseRepository<Domain0022> {
  constructor(readonly manager: EntityManager) {
    super(Domain0022, manager);
  }
}
