import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0003 } from './domain-0003.entity';
import { Domain0003Resolver } from './domain-0003.resolver';
import { Domain0003Service } from './domain-0003.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0003])],
  providers: [
    Domain0003Resolver,
    Domain0003Service,
    // Domain0003ByIdLoader,
    // Domain0003ByIdResolver,
  ],
})
export class Domain0003Module {}
