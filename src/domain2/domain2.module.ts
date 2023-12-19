import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain2 } from './domain2.entity';
import { Domain2Resolver } from './domain2.resolver';
import { Domain2Service } from './domain2.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain2])],
  providers: [Domain2Resolver, Domain2Service],
})
export class Domain2Module {}
