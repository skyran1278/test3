import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { Domain0010 } from './domain-0010.entity';
import { CreateDomain0010Input } from './mutation/create-domain-0010.input';
import { Domain0010PageArgs } from './query/domain-0010-page.args';

@Injectable()
export class Domain0010Service extends BaseService<Domain0010> {
  constructor(
    @InjectRepository(Domain0010)
    readonly repo: Repository<Domain0010>,
  ) {
    super(repo);
  }

  @Transactional()
  async saveOne(
    input: CreateDomain0010Input | Domain0010,
  ): Promise<Domain0010> {
    return this.save(input);
  }

  @Transactional()
  findPage(args: Domain0010PageArgs) {
    return this.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0010 = await this.findOneByOrFail({ id });

    return this.softRemove(domain0010);
  }
}
