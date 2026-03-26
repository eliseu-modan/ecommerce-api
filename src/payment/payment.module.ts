import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MailService } from '../services/mail.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './repositories/payment.repository';
import { GetPaymentDetailsUseCase } from './use-cases/get-payment-details.use-case';
import { MakePaymentUseCase } from './use-cases/make-payment.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    PaymentRepository,
    MailService,
    MakePaymentUseCase,
    GetPaymentDetailsUseCase,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
