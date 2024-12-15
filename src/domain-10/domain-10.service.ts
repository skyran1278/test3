import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain10 } from './domain-10.entity';
import { Domain10Repository } from './domain-10.repository';
import { CreateDomain10Input } from './mutation/create-domain-10.input';
import { UpdateDomain10Input } from './mutation/update-domain-10.input';
import { Domain10PageArgs } from './query/domain-10-page.args';

@Injectable()
export class Domain10Service {
  constructor(private readonly repo: Domain10Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain10Input | UpdateDomain10Input,
  ): Promise<Domain10> {
    const domain10 = this.repo.create(input);
    await this.repo.save(domain10);

    return domain10;
  }

  @Transactional()
  findPage(args: Domain10PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain10 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain10);
  }
}
