import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { Domain0009 } from './domain-0009.entity';
import { CreateDomain0009Input } from './mutation/create-domain-0009.input';
import { UpdateDomain0009sInput } from './mutation/update-domain-0009s.input';
import { Domain0009PageArgs } from './query/domain-0009-page.args';

@Injectable()
export class Domain0009Service extends BaseService<Domain0009> {
  constructor(
    @InjectRepository(Domain0009)
    readonly repo: Repository<Domain0009>,
  ) {
    super(repo);
  }

  @Transactional()
  async saveOne(
    input: CreateDomain0009Input | Domain0009,
  ): Promise<Domain0009> {
    return this.save(input);
  }

  @Transactional()
  findPage(args: Domain0009PageArgs) {
    return this.findNodePage(args);
  }

  @Transactional()
  async updateMany(input: UpdateDomain0009sInput): Promise<Domain0009[]> {
    return this.save(input.domain0009s);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0009 = await this.findOneByOrFail({ id });
    return this.softRemove(domain0009);
  }
}
