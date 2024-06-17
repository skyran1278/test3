import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { AlsService } from '../als/als.service';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { GraphQLContext } from '../common/graphql-context.interface';
import { CustomAuthenticationError } from '../error/custom-authentication.error';
import { User } from '../user/user.entity';
import { NoAuthentication } from './no-authentication.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly alsService: AlsService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const classRef = context.getClass();

    const noAuthentication = this.reflector.getAllAndOverride<boolean>(
      NoAuthentication,
      [handler, classRef],
    );
    if (noAuthentication) return true;

    if (!this.authentication(context)) return false;

    await this.authorization();

    return true;
  }

  private authentication(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext: GraphQLContext = ctx.getContext();

    // prevent multiple query
    if (this.alsService.get('user')) {
      return true;
    }

    const token = this.extractTokenFromHeader(gqlContext.req);
    if (!token) {
      throw new CustomAuthenticationError();
    }
    try {
      const user = this.jwtService.verify<User>(token);
      user.createdAt = new Date(user.createdAt);
      user.updatedAt = new Date(user.updatedAt);

      this.alsService.set('user', user);
    } catch {
      throw new CustomAuthenticationError();
    }
    return true;
  }

  private async authorization() {
    const ability = await this.caslAbilityFactory.createAbilityFor(
      this.alsService.get('user'),
    );
    this.alsService.set('ability', ability);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
