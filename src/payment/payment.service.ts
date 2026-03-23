import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MailService } from '../services/mail.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService
  ) {}

  async makePayment(paymentDto: { id: string; orderId: string }) {
    const { id, orderId } = paymentDto;

    const existingPayment = await this.prisma.payment.findFirst({
      where: {
        id,
        orderId,
      },
    });

    if (!existingPayment) {
      throw new ConflictException('Pagamento não encontrado.');
    }
    if (existingPayment.status === '1') {
      return { message: 'Pagamento já foi realizado anteriormente.' };
    }
    if (existingPayment.status === '0') {
      //chamar api de pagamento aqui

      await this.mailService.paymentConfirmation('eliseuservice14@gmail.com', orderId);

      // 3️⃣ Se o pagamento for bem-sucedido, atualiza o status para '1'
      const updatedPayment = await this.prisma.payment.update({
        where: { id },
        data: {
          status: '1',
        },
      });

      return {
        message: 'Pagamento concluído com sucesso!',
        payment: updatedPayment,
      };
    }

    // 4️⃣ Caso tenha outro status inesperado
    return { message: `Status inválido: ${existingPayment.status}` };
  }

  async getPaymentDetails(id: string) {
    const payments = await this.prisma.payment.findFirst({
      where: { orderId: id },
    });
    return payments;
  }
}
