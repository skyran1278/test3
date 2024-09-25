import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0021ByIdLoader } from './domain-0021-by-id.loader';
import { Domain0021ChildrenLoader } from './domain-0021-children.loader';
import { Domain0021 } from './domain-0021.entity';
import { Domain0021Repository } from './domain-0021.repository';
import { Domain0021Resolver } from './domain-0021.resolver';
import { Domain0021Service } from './domain-0021.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0021])],
  providers: [
    Domain0021Repository,
    Domain0021Service,
    Domain0021Resolver,
    Domain0021ChildrenLoader,
    Domain0021ByIdLoader,
    // Domain0021ByIdResolver,
  ],
})
export class Domain0021Module {}
