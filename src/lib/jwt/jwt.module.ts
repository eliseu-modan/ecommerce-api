import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { buildJwtModuleOptions } from './jwt.constants';
import { JwtTokenService } from './jwt-token.service';

@Module({
  imports: [
    ConfigModule,
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        buildJwtModuleOptions(configService),
    }),
  ],
  providers: [JwtTokenService],
  exports: [NestJwtModule, JwtTokenService],
})
export class AppJwtModule {}
