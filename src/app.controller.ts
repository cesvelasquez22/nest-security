import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/constants';
import { AuthService } from './auth/services/auth/auth.service';
import { JwtAuthGuard } from './core/jwt-auth.guard';
import { LocalAuthGuard } from './core/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private auhtService: AuthService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.auhtService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
