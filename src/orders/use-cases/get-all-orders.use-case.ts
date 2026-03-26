import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class GetAllOrdersUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute(userId: string) {
    try {
      return await this.ordersRepository.findAllByUserId(userId);
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching orders');
    }
  }
}
