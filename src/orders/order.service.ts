import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrderService(userId: string, orderDto: CreateOrderDto) {
    try {
      const { totalAmount, items, payment } = orderDto;

      if (!items || items.length === 0) {
        throw new BadRequestException('Order must have at least one item');
      }

      if (!payment || payment.length === 0) {
        throw new BadRequestException('Payment information is required');
      }

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
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error while creating order');
    }
  }

  async getAllOrdersService(userId: string) {
    try {
      return await this.prisma.order.findMany({
        where: { userId },
        include: {
          items: true,
          payment: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching orders');
    }
  }
}
