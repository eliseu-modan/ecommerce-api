import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { Prisma } from '@prisma/client'; // <- CORRETO

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrderService(userId: string, orderDto: CreateOrderDto) {
    const { totalAmount, items, payment } = orderDto;

    const order = await this.prisma.order.create({
      data: {
        userId,
        totalAmount: new Prisma.Decimal(totalAmount),
        status: 'Pendente',
      },
    });

    const orderItemsData = items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: new Prisma.Decimal(item.unitPrice),
      subtotal: new Prisma.Decimal(item.subtotal),
    }));

    await this.prisma.orderItem.createMany({
      data: orderItemsData,
    });

    await this.prisma.payment.create({
      data: {
        method: payment[0].method,
        status: payment[0].status,
        amountPaid: new Prisma.Decimal(payment[0].amountPaid),
        paidAt: payment[0].paidAt,
        order: {
          connect: { id: order.id },
        },
      },
    });

    return {
      ...order,
      items: orderItemsData,
    };
  }

  async getAllOrdersService(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        payment: true,
      },
    });
  }
}
