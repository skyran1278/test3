import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Transactional } from 'typeorm-transactional';

import { CustomAuthenticationError } from '../error/custom-authentication.error';
import { UserRepository } from '../user/user.repository';
import { SignInInput } from './mutation/sign-in.input';
import { SignInOutput } from './mutation/sign-in.output';

@Injectable()
export class SecurityService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  @Transactional()
  async signIn(input: SignInInput): Promise<SignInOutput> {
    const user = await this.userRepository.findOne({
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
