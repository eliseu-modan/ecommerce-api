import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppJwtModule } from 'src/lib/jwt/jwt.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HandleGoogleLoginUseCase } from './use-cases/handle-google-login.use-case';
import { LoginUseCase } from './use-cases/login.use-case';

@Module({
  imports: [UsersModule, ConfigModule, AppJwtModule],
  providers: [
    HandleGoogleLoginUseCase,
    LoginUseCase,
    GoogleStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
