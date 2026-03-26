import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateOrderDto } from '../dto/create-order-dto';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute(userId: string, orderDto: CreateOrderDto) {
    try {
      const { totalAmount, items, payment } = orderDto;

      if (!items || items.length === 0) {
        throw new BadRequestException('Order must have at least one item');
      }

      if (!payment || payment.length === 0) {
        throw new BadRequestException('Payment information is required');
      }

      const order = await this.ordersRepository.createOrder({
        userId,
        totalAmount: new Prisma.Decimal(totalAmount),
        status: 'Pendente',
      });

      const orderItemsData = items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: new Prisma.Decimal(item.unitPrice),
        subtotal: new Prisma.Decimal(item.subtotal),
      }));

      await this.ordersRepository.createOrderItems(orderItemsData);

      await this.ordersRepository.createPayment({
        method: payment[0].method,
        status: payment[0].status,
        amountPaid: new Prisma.Decimal(payment[0].amountPaid),
        paidAt: payment[0].paidAt,
        orderId: order.id,
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
}
