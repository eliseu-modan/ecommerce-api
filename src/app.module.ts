import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { PrismaService } from './prisma.service';
import { MailService } from './services/mail.service';
@Module({
  imports: [AuthModule, UsersModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, MailService],
  exports: [PrismaService, MailService],
})
export class AppModule {}
