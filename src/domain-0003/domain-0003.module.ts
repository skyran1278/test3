import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0003 } from './domain-0003.entity';
import { Domain0003Service } from './domain-0003.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0003])],
  providers: [
    Domain0003Service,
    // Domain0003Resolver,
    // Domain0003IdLoader,
    // Domain0003IdResolver,
  ],
  exports: [Domain0003Service],
})
export class Domain0003Module {}
