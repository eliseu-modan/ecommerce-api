import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(AuthDto: AuthDto) {
    const { email, password } = AuthDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    if (!user.password) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }
    const isPasswordValid = user.password && await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return { access_token: token, user };
  }
}
