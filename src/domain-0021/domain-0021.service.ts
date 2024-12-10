import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0021 } from './domain-0021.entity';
import { Domain0021Repository } from './domain-0021.repository';
import { CreateDomain0021Input } from './mutation/create-domain-0021.input';
import { CreateDomain0021sInput } from './mutation/create-domain-0021s.input';
import { UpdateDomain0021Input } from './mutation/update-domain-0021.input';
import { Domain0021PageArgs } from './query/domain-0021-page.args';

@Injectable()
export class Domain0021Service {
  constructor(private readonly repo: Domain0021Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0021Input | UpdateDomain0021Input,
  ): Promise<Domain0021> {
    const domain0021 = this.repo.create(input);
    await this.repo.save(domain0021);

    return domain0021;
  }

  @Transactional()
  async saveMany(input: CreateDomain0021sInput): Promise<Domain0021[]> {
    const domain0021s = this.repo.create(input.domain0021s);
    await this.repo.save(domain0021s);

    return domain0021s;
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
