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
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoogleAuthGuard } from './guards/auth-google.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    return { message: 'Redirecionando para o Google...' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { token, user } = await this.authService.handleGoogleLogin(req.user);

    const userParam = encodeURIComponent(JSON.stringify(user));
    return res.redirect(
      `http://localhost:9000/auth/googleAuth?token=${token}&user=${userParam}`,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Login com email e senha' })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso.',
  })
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
