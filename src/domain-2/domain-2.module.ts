import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain2 } from './domain-2.entity';
import { Domain2Service } from './domain-2.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain2])],
  providers: [
    Domain2Service,
    // Domain2Resolver,
    // Domain2IdLoader,
    // Domain2IdResolver,
  ],
})
export class Domain2Module {}
