import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByIdAndOrderId(id: string, orderId: string) {
    return this.prisma.payment.findFirst({
      where: {
        id,
        orderId,
      },
    });
  }

  updateStatus(id: string, status: string) {
    return this.prisma.payment.update({
      where: { id },
      data: { status },
    });
  }

  findByOrderId(orderId: string) {
    return this.prisma.payment.findFirst({
      where: { orderId },
    });
  }
}
