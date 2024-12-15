import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain08 } from './domain-08.entity';
import { Domain08Repository } from './domain-08.repository';
import { CreateDomain08Input } from './mutation/create-domain-08.input';
import { UpdateDomain08Input } from './mutation/update-domain-08.input';
import { UpdateDomain08sInput } from './mutation/update-domain-08s.input';
import { Domain08PageArgs } from './query/domain-08-page.args';

@Injectable()
export class Domain08Service {
  constructor(private readonly repo: Domain08Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain08Input | UpdateDomain08Input,
  ): Promise<Domain08> {
    const domain08 = this.repo.create(input);
    await this.repo.save(domain08);

    return domain08;
  }

  @Transactional()
  findPage(args: Domain08PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async updateMany(input: UpdateDomain08sInput): Promise<Domain08[]> {
    return this.repo.save(this.repo.create(input.domain08s));
  }

  @Transactional()
  async removeOne(id: string) {
    const domain08 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain08);
  }
}
