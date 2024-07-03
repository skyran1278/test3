import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0021 } from './domain-0021.entity';

@Injectable()
export class Domain0021Repository extends BaseRepository<Domain0021> {
  constructor(
    @InjectRepository(Domain0021)
    readonly repo: Repository<Domain0021>,
  ) {
    super(repo);
  }
}
