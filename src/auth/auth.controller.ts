import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { GoogleAuthGuard } from './guards/auth-google.guard';
import { HandleGoogleLoginUseCase } from './use-cases/handle-google-login.use-case';
import { LoginUseCase } from './use-cases/login.use-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly handleGoogleLoginUseCase: HandleGoogleLoginUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    return { message: 'Redirecionando para o Google...' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { token, user } = await this.handleGoogleLoginUseCase.execute(
      req.user,
    );

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
    return this.loginUseCase.execute(authDto);
  }
}
