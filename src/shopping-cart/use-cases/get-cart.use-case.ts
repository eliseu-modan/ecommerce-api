import { Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';

@Injectable()
export class GetCartUseCase {
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
  ) {}

  async execute(userId: string) {
    let cart = await this.shoppingCartRepository.findCartWithItems(userId);

    if (!cart) {
      await this.shoppingCartRepository.createCart(userId);
      cart = await this.shoppingCartRepository.findCartWithItems(userId);
    }

    return cart;
  }
}
