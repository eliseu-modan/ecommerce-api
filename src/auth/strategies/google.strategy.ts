import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {

    if (!profile) {
      return done(new Error('Google não retornou o profile'), null);
    }

    const { name, emails, photos, id } = profile;

    const user = {
      googleId: id,
      email: emails?.[0]?.value ?? null,
      name: `${name?.givenName ?? ''} ${name?.familyName ?? ''}`.trim(),
      profilePhoto: photos?.[0]?.value ?? null,
    };

    done(null, user);
  }
}
