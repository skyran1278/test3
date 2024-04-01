import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0011 } from './domain-0011.entity';
import { Domain0011Resolver } from './domain-0011.resolver';
import { Domain0011Service } from './domain-0011.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0011])],
  providers: [
    Domain0011Resolver,
    Domain0011Service,
    // Domain0011IdLoader,
    // Domain0011IdResolver,
  ],
})
export class Domain0011Module {}
