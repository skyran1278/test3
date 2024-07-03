import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0021 } from './domain-0021.entity';
import { Domain0021Repository } from './domain-0021.repository';
import { CreateDomain0021Input } from './mutation/create-domain-0021.input';
import { UpdateDomain0021Input } from './mutation/update-domain-0021.input';
import { Domain0021PageArgs } from './query/domain-0021-page.args';

@Injectable()
export class Domain0021Service {
  constructor(private readonly repo: Domain0021Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0021Input | UpdateDomain0021Input,
  ): Promise<Domain0021> {
    const domain0021 = await this.repo.save(input);

    return domain0021;
  }

  @Transactional()
  findPage(args: Domain0021PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0021 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0021);
  }
}
