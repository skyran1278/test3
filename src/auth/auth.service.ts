import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { IServiceMetadata } from 'src/common/interface/service-metadata.interface';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { FindOneOptions, Repository } from 'typeorm';

import { SignInInput } from './mutation/sign-in.input';
import { SignInOutput } from './mutation/sign-in.output';

@Injectable()
export class AuthService extends BaseService<User> {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  async signIn(
    input: SignInInput,
    metadata?: IServiceMetadata,
  ): Promise<SignInOutput> {
    const user = await this.userService.findOne(
      {
        where: { user001: input.user001 },
      },
      metadata,
    );

    if (user?.user002 !== input.user002) {
      throw new UnauthorizedException();
    }

    const { user002, ...payload } = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findOne(
    options: FindOneOptions<User>,
    metadata?: IServiceMetadata,
  ): Promise<User | null> {
    const authRepo = metadata?.manager
      ? metadata.manager.getRepository(User)
      : this.repo;
    return authRepo.findOne(options);
  }
}
