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
import { User } from 'src/user/user.entity';

import { IGraphQLContext } from '../interface/graphql-context.interface';
import { NoAuthentication } from './no-authentication.decorator';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const classRef = context.getClass();

    const noAuthentication = this.reflector.getAllAndOverride<boolean>(
      NoAuthentication,
      [handler, classRef],
    );
    if (noAuthentication) return true;

    if (!(await this.authentication(context))) return false;

    return true;
  }

  private async authentication(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext: IGraphQLContext = ctx.getContext();
    const token = this.extractTokenFromHeader(gqlContext.req);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.jwtService.verifyAsync<User>(token);
      // use Promise, to prevent multiple query
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
