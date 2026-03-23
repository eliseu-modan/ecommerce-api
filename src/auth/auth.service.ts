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

  async handleGoogleLogin(googleUser: any) {
    let user = await this.userService.findByEmail(googleUser.email);

    if (!user) {
      user = await this.userService.create({
        name: googleUser.name,
        email: googleUser.email,
        profilePic: googleUser.profilePhoto,
        googleId: googleUser.googleId,
        role: 'USER',
      });
    }

    const token = this.generateToken(user);
    return { token, user };
  }

  private generateToken(user: any) {
    return this.jwtService.sign(
      { userId: user.id, email: user.email, role: user.role },
      { expiresIn: '1h' },
    );
  }

  async login(AuthDto: AuthDto) {
    const { email, password } = AuthDto;
    const user = await this.userService.findByEmail(email);

    const unauthorizedException = new UnauthorizedException(
      'E-mail ou senha inválidos',
    );

    if (!user || !user.password) {
      throw unauthorizedException;
    }
    const isPasswordValid =
      user.password && (await bcrypt.compare(password, user.password));
    if (!isPasswordValid) {
      throw unauthorizedException;
    }

    const dataOfAuth = { userId: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(dataOfAuth, { expiresIn: '1h' });

    return { access_token: token, user };
  }
}
