import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0003 } from './domain-0003.entity';
import { Domain0003Repository } from './domain-0003.repository';
import { CreateDomain0003Input } from './mutation/create-domain-0003.input';
import { UpdateDomain0003Input } from './mutation/update-domain-0003.input';
import { Domain0003PageArgs } from './query/domain-0003-page.args';

@Injectable()
export class Domain0003Service {
  constructor(private readonly repo: Domain0003Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0003Input | UpdateDomain0003Input,
  ): Promise<Domain0003> {
    const domain0003 = this.repo.create(input);
    await this.repo.save(domain0003);

    return domain0003;
  }

  @Transactional()
  findPage(args: Domain0003PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0003 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0003);
  }
}
