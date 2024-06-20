import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { BaseService } from '../common/base.service';
import { CustomAuthenticationError } from '../error/custom-authentication.error';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { SignInInput } from './mutation/sign-in.input';
import { SignInOutput } from './mutation/sign-in.output';

@Injectable()
export class SecurityService extends BaseService<User> {
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
      where: { email: input.email },
    });

    if (user?.hashedPassword !== input.password) {
      throw new CustomAuthenticationError('Invalid password.');
    }

    const { hashedPassword, ...payload } = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
