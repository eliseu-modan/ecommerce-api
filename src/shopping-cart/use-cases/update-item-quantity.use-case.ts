import { Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';

@Injectable()
export class UpdateItemQuantityUseCase {
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
  ) {}

  async execute(cartId: string, productId: string, quantity: number) {
    const cartItem = await this.shoppingCartRepository.findCartItem(
      cartId,
      productId,
    );

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    return this.shoppingCartRepository.updateCartItemQuantity(
      cartItem.id,
      quantity,
    );
  }
}
