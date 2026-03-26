import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from 'src/lib/jwt/jwt-token.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.usersRepository.findByEmail(email);

    const unauthorizedException = new UnauthorizedException(
      'E-mail ou senha inválidos',
    );

    if (!user || !user.password) {
      throw unauthorizedException;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw unauthorizedException;
    }

    const token = this.jwtTokenService.sign(
      this.jwtTokenService.buildPayload(user),
    );

    return { access_token: token, user };
  }
}
