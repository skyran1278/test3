import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0001 } from './domain-0001.entity';
import { Domain0001Repository } from './domain-0001.repository';
import { CreateDomain0001Input } from './mutation/create-domain-0001.input';
import { UpdateDomain0001Input } from './mutation/update-domain-0001.input';
import { Domain0001PageArgs } from './query/domain-0001-page.args';

@Injectable()
export class Domain0001Service {
  constructor(private readonly repo: Domain0001Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0001Input | UpdateDomain0001Input,
  ): Promise<Domain0001> {
    const domain0001 = this.repo.create(input);
    await this.repo.save(domain0001);

    return domain0001;
  }

  @Transactional()
  findPage(args: Domain0001PageArgs) {
    return this.repo.findNodePage({
      ...args,
      where: args.where.map((item) => item.toFindOptionsWhere()),
    });
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0001 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0001);
  }
}
