import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0009 } from './domain-0009.entity';
import { Domain0009Repository } from './domain-0009.repository';
import { CreateDomain0009Input } from './mutation/create-domain-0009.input';
import { UpdateDomain0009Input } from './mutation/update-domain-0009.input';
import { Domain0009PageArgs } from './query/domain-0009-page.args';

@Injectable()
export class Domain0009Service {
  constructor(private readonly repo: Domain0009Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0009Input | UpdateDomain0009Input,
  ): Promise<Domain0009> {
    const domain0009 = this.repo.create(input);
    await this.repo.save(domain0009);

    return domain0009;
  }

  @Transactional()
  findPage(args: Domain0009PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0009 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0009);
  }
}
