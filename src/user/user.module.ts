import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserByIdLoader } from './user-by-id.loader';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserRepository,
    UserService,
    UserResolver,
    UserByIdLoader,
    // UserByIdResolver,
  ],
  exports: [UserRepository, UserByIdLoader],
})
export class UserModule {}
