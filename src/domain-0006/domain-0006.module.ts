import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0006 } from './domain-0006.entity';
import { Domain0006Resolver } from './domain-0006.resolver';
import { Domain0006Service } from './domain-0006.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0006])],
  providers: [
    Domain0006Resolver,
    Domain0006Service,
    // Domain0006IdLoader,
    // Domain0006IdResolver,
  ],
})
export class Domain0006Module {}
