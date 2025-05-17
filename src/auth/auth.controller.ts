import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return { message: 'Redirecionando para o Google...' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const googleUser = req.user;

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
    const payload = { userId: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return res.redirect(`http://localhost:3001/auth/callback?token=${token}`);
  }

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
