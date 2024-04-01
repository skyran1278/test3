import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0012 } from './domain-0012.entity';
import { Domain0012Resolver } from './domain-0012.resolver';
import { Domain0012Service } from './domain-0012.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0012])],
  providers: [
    Domain0012Resolver,
    Domain0012Service,
    // Domain0012IdLoader,
    // Domain0012IdResolver,
  ],
})
export class Domain0012Module {}
