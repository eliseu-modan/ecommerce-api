import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const JWT_EXPIRES_IN = '1h';

export function buildJwtModuleOptions(
  configService: ConfigService,
): JwtModuleOptions {
  return {
    secret: configService.getOrThrow<string>('JWT_SECRET'),
    signOptions: { expiresIn: JWT_EXPIRES_IN },
  };
}
