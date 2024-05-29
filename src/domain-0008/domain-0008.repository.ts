import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0008 } from './domain-0008.entity';

@Injectable()
export class Domain0008Repository extends BaseRepository<Domain0008> {
  constructor(
    @InjectRepository(Domain0008)
    readonly repo: Repository<Domain0008>,
  ) {
    super(repo);
  }
}
