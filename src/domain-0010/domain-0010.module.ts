import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0010 } from './domain-0010.entity';
import { Domain0010Service } from './domain-0010.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0010])],
  providers: [
    Domain0010Service,
    // Domain0010Resolver,
    // Domain0010IdLoader,
    // Domain0010IdResolver,
  ],
  exports: [Domain0010Service],
})
export class Domain0010Module {}
