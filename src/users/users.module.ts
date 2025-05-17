import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { MailService } from '../services/mail.service';

@Module({
  providers: [UsersService, PrismaService, MailService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
