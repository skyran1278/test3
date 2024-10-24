import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

interface BasicAuthMiddlewareOptions {
  users: { [username: string]: string };
}

/**
 * @see https://github.com/LionC/express-basic-auth
 * @see https://github.com/felixmosh/bull-board/tree/master/examples/with-nestjs-module
 * @see https://github.com/felixmosh/bull-board/blob/master/examples/with-nestjs/src/queues/basic-auth.middleware.ts
 */
@Injectable()
export class BasicAuthService {
  use(options: BasicAuthMiddlewareOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.get('authorization');

      if (!authHeader || !authHeader.startsWith('Basic ')) {
        this.sendUnauthorizedResponse(res);
        return;
      }

      const encodedCredential = authHeader.split(' ')[1];
      const decodedCredential = Buffer.from(
        encodedCredential,
        'base64',
      ).toString('utf-8');
      const [username, password] = decodedCredential.split(':');

      if (!this.authorizer(options.users, username, password)) {
        this.sendUnauthorizedResponse(res);
        return;
      }

      next();
    };
  }

  private authorizer(
    users: { [username: string]: string },
    username: string,
    password: string,
  ) {
    for (const user in users) {
      if (username === user && password === users[user]) {
        return true;
      }
    }

    return false;
  }

  private sendUnauthorizedResponse(res: Response): void {
    res.setHeader(
      'WWW-Authenticate',
      'Basic realm="Restricted Area", charset="UTF-8"',
    );
    res.sendStatus(401);
  }
}
