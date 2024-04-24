import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { BaseService } from '../common/base.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
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

  @Transactional()
  async signIn(input: SignInInput): Promise<SignInOutput> {
    const user = await this.userService.findOne({
      where: { user001: input.user001 },
    });

    if (user?.user002 !== input.user002) {
      throw new UnauthorizedException();
    }

    const { user002, ...payload } = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
