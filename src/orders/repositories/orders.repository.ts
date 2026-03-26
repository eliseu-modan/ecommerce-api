import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOrder(data: {
    userId: string;
    totalAmount: Prisma.Decimal;
    status: string;
  }) {
    return this.prisma.order.create({ data });
  }

  createOrderItems(
    data: Array<{
      orderId: string;
      productId: string;
      quantity: number;
      unitPrice: Prisma.Decimal;
      subtotal: Prisma.Decimal;
    }>,
  ) {
    return this.prisma.orderItem.createMany({ data });
  }

  createPayment(data: {
    method: string;
    status: string;
    amountPaid: Prisma.Decimal;
    paidAt?: Date;
    orderId: string;
  }) {
    return this.prisma.payment.create({
      data: {
        method: data.method,
        status: data.status,
        amountPaid: data.amountPaid,
        paidAt: data.paidAt,
        order: {
          connect: { id: data.orderId },
        },
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        payment: true,
      },
    });
  }
}
