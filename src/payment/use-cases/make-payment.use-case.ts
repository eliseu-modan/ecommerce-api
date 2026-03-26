import { ConflictException, Injectable } from '@nestjs/common';
import { MailService } from 'src/services/mail.service';
import { PaymentDto } from '../dto/paymentDto';
import { PaymentRepository } from '../repositories/payment.repository';

@Injectable()
export class MakePaymentUseCase {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly mailService: MailService,
  ) {}

  async execute(paymentDto: PaymentDto) {
    const { id, orderId } = paymentDto;

    const existingPayment = await this.paymentRepository.findByIdAndOrderId(
      id,
      orderId,
    );

    if (!existingPayment) {
      throw new ConflictException('Pagamento não encontrado.');
    }

    if (existingPayment.status === '1') {
      return { message: 'Pagamento já foi realizado anteriormente.' };
    }

    if (existingPayment.status === '0') {
      await this.mailService.paymentConfirmation(
        'eliseuservice14@gmail.com',
        orderId,
      );

      const updatedPayment = await this.paymentRepository.updateStatus(id, '1');

      return {
        message: 'Pagamento concluído com sucesso!',
        payment: updatedPayment,
      };
    }

    return { message: `Status inválido: ${existingPayment.status}` };
  }
}
