import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0010 } from './domain-0010.entity';
import { Domain0010Repository } from './domain-0010.repository';
import { Domain0010Service } from './domain-0010.service';
import { Domain0010sByDomain0009IdLoader } from './domain-0010s-by-domain-0009-id.loader';
import { Domain0010sByDomain0009IdResolver } from './domain-0010s-by-domain-0009-id.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0010])],
  providers: [
    Domain0010Repository,
    Domain0010Service,
    Domain0010sByDomain0009IdLoader,
    Domain0010sByDomain0009IdResolver,
    // Domain0010Resolver,
    // Domain0010ByIdLoader,
    // Domain0010ByIdResolver,
  ],
  exports: [Domain0010Repository],
})
export class Domain0010Module {}
