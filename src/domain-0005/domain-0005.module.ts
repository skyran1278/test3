import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0005 } from './domain-0005.entity';
import { Domain0005Service } from './domain-0005.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0005])],
  providers: [
    // Domain0005Resolver,
    Domain0005Service,
    // Domain0005IdLoader,
    // Domain0005IdResolver,
  ],
  exports: [Domain0005Service],
})
export class Domain0005Module {}
