import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { buildJwtModuleOptions } from 'src/lib/jwt/jwt.constants';
import { JwtPayload } from 'src/lib/jwt/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const jwtOptions = buildJwtModuleOptions(configService);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.secret,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  }
}
