import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain3Module } from 'src/domain-3/domain-3.module';
import { Domain2IdLoader } from './domain-2-id.loader';
import { Domain2IdResolver } from './domain-2-id.resolver';
import { Domain2 } from './domain-2.entity';
import { Domain2Resolver } from './domain-2.resolver';
import { Domain2Service } from './domain-2.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain2]), Domain3Module],
  providers: [
    Domain2Service,
    Domain2Resolver,
    Domain2IdLoader,
    Domain2IdResolver,
  ],
})
export class Domain2Module {}
