import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

import { SignInInput } from './mutation/sign-in.input';
import { SignInOutput } from './mutation/sign-in.output';

@Injectable()
export class AuthService extends BaseService<User> {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(User)
    readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  async signIn(
    input: SignInInput,
    options?: ServiceOptions,
  ): Promise<SignInOutput> {
    const user = await this.userService.findOne(
      {
        where: { user001: input.user001 },
      },
      options,
    );

    if (user?.user002 !== input.user002) {
      throw new UnauthorizedException();
    }

    const { user002, ...payload } = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
