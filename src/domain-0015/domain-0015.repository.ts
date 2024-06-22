import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0015 } from './domain-0015.entity';

@Injectable()
export class Domain0015Repository extends BaseRepository<Domain0015> {
  constructor(
    @InjectRepository(Domain0015)
    readonly repo: Repository<Domain0015>,
  ) {
    super(repo);
  }
}
