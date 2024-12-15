import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain03 } from './domain-03.entity';
import { Domain03Repository } from './domain-03.repository';
import { CreateDomain03Input } from './mutation/create-domain-03.input';
import { UpdateDomain03Input } from './mutation/update-domain-03.input';
import { Domain03PageArgs } from './query/domain-03-page.args';

@Injectable()
export class Domain03Service {
  constructor(private readonly repo: Domain03Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain03Input | UpdateDomain03Input,
  ): Promise<Domain03> {
    const domain03 = this.repo.create(input);
    await this.repo.save(domain03);

    return domain03;
  }

  @Transactional()
  findPage(args: Domain03PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain03 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain03);
  }
}
