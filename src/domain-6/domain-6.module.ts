import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain6 } from './domain-6.entity';
import { Domain6Resolver } from './domain-6.resolver';
import { Domain6Service } from './domain-6.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain6])],
  providers: [
    Domain6Resolver,
    Domain6Service,
    // Domain6IdLoader,
    // Domain6IdResolver,
  ],
})
export class Domain6Module {}
