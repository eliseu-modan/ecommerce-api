import { PrismaService } from 'src/prisma.service';
import { AddItemCartDto } from './dto/add-item-cart';
import { Injectable } from '@nestjs/common';
import { DistanceMatrixService } from '../services/distance-matrix.service';

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly distanceMatrixService: DistanceMatrixService,
  ) {}

  async addItemToCart(itemDto: AddItemCartDto, userId: string) {
    const { productId } = itemDto;

    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (!existingItem) {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1,
        },
      });
    }
  }

  async getCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      throw new Error('Cart not found');
    }
    return cart;
  }

  async updateItemQuantity(
    cartId: string,
    productId: string,
    quantity: number,
  ) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    return this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
    });
  }

  async removeItemFromCart(cartId: string, productId: string) {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    return this.prisma.cartItem.delete({
      where: { id: cartItem.id },
    });
  }

  async calculateShipping(
    origins: string[] | string,
    destinations: string[] | string,
    userId: string,
  ): Promise<any> {
    const originsArray = Array.isArray(origins) ? origins : [origins];
    const destinationsArray = Array.isArray(destinations)
      ? destinations
      : [destinations];

    const distanceResponse = await this.distanceMatrixService.getDistance(
      originsArray,
      destinationsArray,
    );

    if (
      !distanceResponse.rows?.length ||
      !distanceResponse.rows[0]?.elements?.length
    ) {
      throw new Error(
        distanceResponse.error_message || 'Erro ao calcular a distância.',
      );
    }

    const element = distanceResponse.rows[0].elements[0];

    if (element.status !== 'OK') {
      throw new Error(
        'Não foi possível calcular o frete para os endereços informados.',
      );
    }

    const distanceInMeters = element.distance.value;
    const durationInSeconds = element.duration.value;

    const distanceInKm = distanceInMeters / 1000;
    const freightCost = distanceInKm * 2;

    return {
      userId,
      distance: {
        text: element.distance.text,
        value: distanceInMeters,
      },
      duration: {
        text: element.duration.text,
        value: durationInSeconds,
      },
      freightCost: freightCost.toFixed(2),
    };
  }
}
