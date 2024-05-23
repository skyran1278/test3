import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0001 } from './domain-0001.entity';

@Injectable()
export class Domain0001Repository extends BaseRepository<Domain0001> {
  constructor(
    @InjectRepository(Domain0001)
    readonly repo: Repository<Domain0001>,
  ) {
    super(repo);
  }
}
