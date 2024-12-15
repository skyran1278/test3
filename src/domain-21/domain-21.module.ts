import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain21ByIdLoader } from './domain-21-by-id.loader';
import { Domain21ChildrenLoader } from './domain-21-children.loader';
import { Domain21 } from './domain-21.entity';
import { Domain21Repository } from './domain-21.repository';
import { Domain21Resolver } from './domain-21.resolver';
import { Domain21Service } from './domain-21.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain21])],
  providers: [
    Domain21Repository,
    Domain21Service,
    Domain21Resolver,
    Domain21ChildrenLoader,
    Domain21ByIdLoader,
    // Domain21ByIdResolver,
  ],
})
export class Domain21Module {}
