import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain25 } from './domain-25.entity';
import { Domain25Repository } from './domain-25.repository';
import { Domain25Resolver } from './domain-25.resolver';
import { Domain25Service } from './domain-25.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain25])],
  providers: [
    Domain25Repository,
    Domain25Service,
    Domain25Resolver,
    // Domain25ByIdLoader,
    // Domain25ByIdResolver,
  ],
  exports: [Domain25Repository],
})
export class Domain25Module {}
