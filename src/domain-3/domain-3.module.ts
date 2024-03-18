import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain3 } from './domain-3.entity';
import { Domain3Service } from './domain-3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain3])],
  providers: [
    Domain3Service,
    // Domain3Resolver,
    // Domain3IdLoader,
    // Domain3IdResolver,
  ],
  exports: [Domain3Service],
})
export class Domain3Module {}
