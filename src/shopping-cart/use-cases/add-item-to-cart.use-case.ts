import { Injectable } from '@nestjs/common';
import { AddItemCartDto } from '../dto/add-item-cart';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';

@Injectable()
export class AddItemToCartUseCase {
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
  ) {}

  async execute(itemDto: AddItemCartDto, userId: string) {
    const { productId } = itemDto;

    let cart = await this.shoppingCartRepository.findCartByUserId(userId);

    if (!cart) {
      cart = await this.shoppingCartRepository.createCart(userId);
    }

    const existingItem = await this.shoppingCartRepository.findCartItem(
      cart.id,
      productId,
    );

    if (!existingItem) {
      await this.shoppingCartRepository.createCartItem(cart.id, productId, 1);
    }
  }
}
