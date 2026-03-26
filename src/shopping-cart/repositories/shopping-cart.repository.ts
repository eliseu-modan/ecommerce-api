import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ShoppingCartRepository {
  constructor(private readonly prisma: PrismaService) {}

  findCartByUserId(userId: string) {
    return this.prisma.cart.findUnique({
      where: { userId },
    });
  }

  createCart(userId: string) {
    return this.prisma.cart.create({
      data: { userId },
    });
  }

  findCartItem(cartId: string, productId: string) {
    return this.prisma.cartItem.findFirst({
      where: { cartId, productId },
    });
  }

  createCartItem(cartId: string, productId: string, quantity: number) {
    return this.prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
  }

  findCartWithItems(userId: string) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }

  updateCartItemQuantity(id: string, quantity: number) {
    return this.prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });
  }

  deleteCartItem(id: string) {
    return this.prisma.cartItem.delete({
      where: { id },
    });
  }
}
