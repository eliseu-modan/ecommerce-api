import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  buildPayload(user: { id: string; email: string; role: string }): JwtPayload {
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
