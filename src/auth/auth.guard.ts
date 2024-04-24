import { AuthenticationError } from '@nestjs/apollo';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { GraphQLContext } from '../common/graphql-context.interface';
import { User } from '../user/user.entity';
import { NoAuthentication } from './no-authentication.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const classRef = context.getClass();

    const noAuthentication = this.reflector.getAllAndOverride<boolean>(
      NoAuthentication,
      [handler, classRef],
    );
    if (noAuthentication) return true;

    if (!this.authentication(context)) return false;

    return true;
  }

  private authentication(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext: GraphQLContext = ctx.getContext();

    // prevent multiple query
    if (gqlContext.user) {
      return true;
    }

    const token = this.extractTokenFromHeader(gqlContext.req);
    if (!token) {
      throw new AuthenticationError('Unauthenticated');
    }
    try {
      const user = this.jwtService.verify<User>(token);
      gqlContext.user = {
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
