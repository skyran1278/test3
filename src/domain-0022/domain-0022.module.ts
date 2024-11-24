import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0022ByIdLoader } from './domain-0022-by-id.loader';
import { Domain0022ChildrenLoader } from './domain-0022-children.loader';
import { Domain0022 } from './domain-0022.entity';
import { Domain0022Repository } from './domain-0022.repository';
import { Domain0022Resolver } from './domain-0022.resolver';
import { Domain0022Service } from './domain-0022.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0022])],
  providers: [
    Domain0022Repository,
    Domain0022Service,
    Domain0022Resolver,
    Domain0022ChildrenLoader,
    Domain0022ByIdLoader,
    // Domain0022ByIdResolver,
  ],
})
export class Domain0022Module {}
