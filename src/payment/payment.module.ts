import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from '../prisma.service';
import { MailService } from '../services/mail.service';
@Module({
  providers: [PaymentService, PrismaService, MailService],
  controllers: [PaymentController],
})
export class PaymentModule {}
