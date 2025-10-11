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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('google')
  @ApiOperation({ summary: 'Iniciar autenticação com o Google' })
  @ApiResponse({ status: 200, description: 'Redirecionando para o Google...' })
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return { message: 'Redirecionando para o Google...' };
  }

  @Get('google/callback')
  @ApiOperation({ summary: 'Callback do Google após autenticação' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso.' })
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
  @ApiOperation({ summary: 'Login com email e senha' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso .' })
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
