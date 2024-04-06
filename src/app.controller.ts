import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { NoAuthentication } from './auth/no-authentication.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @NoAuthentication()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
