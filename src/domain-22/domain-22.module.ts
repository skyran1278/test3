import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain22ByIdLoader } from './domain-22-by-id.loader';
import { Domain22ChildrenLoader } from './domain-22-children.loader';
import { Domain22 } from './domain-22.entity';
import { Domain22Repository } from './domain-22.repository';
import { Domain22Resolver } from './domain-22.resolver';
import { Domain22Service } from './domain-22.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain22])],
  providers: [
    Domain22Repository,
    Domain22Service,
    Domain22Resolver,
    Domain22ChildrenLoader,
    Domain22ByIdLoader,
    // Domain22ByIdResolver,
  ],
})
export class Domain22Module {}
