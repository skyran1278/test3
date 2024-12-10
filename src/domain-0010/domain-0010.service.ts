import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0010 } from './domain-0010.entity';
import { Domain0010Repository } from './domain-0010.repository';
import { CreateDomain0010Input } from './mutation/create-domain-0010.input';
import { UpdateDomain0010Input } from './mutation/update-domain-0010.input';
import { Domain0010PageArgs } from './query/domain-0010-page.args';

@Injectable()
export class Domain0010Service {
  constructor(private readonly repo: Domain0010Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0010Input | UpdateDomain0010Input,
  ): Promise<Domain0010> {
    const domain0010 = this.repo.create(input);
    await this.repo.save(domain0010);

    return domain0010;
  }

  @Transactional()
  findPage(args: Domain0010PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0010 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0010);
  }
}
