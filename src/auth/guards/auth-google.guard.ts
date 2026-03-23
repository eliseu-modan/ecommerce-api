import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  getAuthenticateOptions(context) {
  context.switchToHttp().getRequest();

    return {
      scope: ['profile', 'email'],
      prompt: 'select_account',
      maxAge: 0,
      authuser: 0,
      accessType: 'offline',
    };
  }
}
