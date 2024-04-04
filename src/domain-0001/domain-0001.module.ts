import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0001 } from './domain-0001.entity';
import { Domain0001Resolver } from './domain-0001.resolver';
import { Domain0001Service } from './domain-0001.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0001])],
  providers: [
    Domain0001Service,
    Domain0001Resolver,
    // Domain0001ByIdLoader,
    // Domain0001ByIdResolver,
  ],
})
export class Domain0001Module {}
