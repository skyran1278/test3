import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0025 } from './domain-0025.entity';

@Injectable()
export class Domain0025Repository extends BaseRepository<Domain0025> {
  constructor(
    @InjectRepository(Domain0025)
    readonly repo: Repository<Domain0025>,
  ) {
    super(repo);
  }
}
