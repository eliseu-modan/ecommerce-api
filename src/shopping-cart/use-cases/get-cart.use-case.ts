import { Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';

@Injectable()
export class GetCartUseCase {
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
  ) {}

  async execute(userId: string) {
    const cart = await this.shoppingCartRepository.findCartWithItems(userId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    return cart;
  }
}
