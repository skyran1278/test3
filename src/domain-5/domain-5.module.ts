import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain5 } from './domain-5.entity';
import { Domain5Service } from './domain-5.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain5])],
  providers: [
    // Domain5Resolver,
    Domain5Service,
    // Domain5IdLoader,
    // Domain5IdResolver,
  ],
  exports: [Domain5Service],
})
export class Domain5Module {}
