import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddItemCartDto } from './dto/add-item-cart';
import { AddItemToCartUseCase } from './use-cases/add-item-to-cart.use-case';
import { CalculateShippingUseCase } from './use-cases/calculate-shipping.use-case';
import { GetCartUseCase } from './use-cases/get-cart.use-case';
import { RemoveItemFromCartUseCase } from './use-cases/remove-item-from-cart.use-case';
import { UpdateItemQuantityUseCase } from './use-cases/update-item-quantity.use-case';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(
    private readonly addItemToCartUseCase: AddItemToCartUseCase,
    private readonly getCartUseCase: GetCartUseCase,
    private readonly updateItemQuantityUseCase: UpdateItemQuantityUseCase,
    private readonly removeItemFromCartUseCase: RemoveItemFromCartUseCase,
    private readonly calculateShippingUseCase: CalculateShippingUseCase,
  ) {}

  @Post('add-item-to-cart')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Adicionar item ao carrinho' })
  @ApiResponse({
    status: 201,
    description: 'Item adicionado ao carrinho com sucesso.',
  })
  async addItemToCart(@Req() req, @Body() itemDto: AddItemCartDto) {
    const cartItem = await this.addItemToCartUseCase.execute(
      itemDto,
      req.user.userId,
    );
    return { message: 'Item added to cart', item: itemDto, cartItem };
  }

  @Get('get-cart')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter carrinho do usuário' })
  @ApiResponse({
    status: 201,
    description: 'Item adicionado ao carrinho com sucesso.',
  })
  async getCart(@Req() req) {
    const cart = await this.getCartUseCase.execute(req.user.userId);
    return { message: 'Cart retrieved successfully', cart };
  }

  @Patch('update-item-quantity')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar quantidade de item no carrinho' })
  @ApiResponse({
    status: 200,
    description: 'Quantidade do item atualizada com sucesso.',
  })
  async updateItemQuantity(
    @Body() body: { cartId: string; productId: string; quantity: number },
  ) {
    const cart = await this.updateItemQuantityUseCase.execute(
      body.cartId,
      body.productId,
      body.quantity,
    );
    return { message: 'Item quantity updated successfully', cart };
  }

  @Delete('remove-item/:cartId/:productId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remover item do carrinho' })
  @ApiResponse({
    status: 200,
    description: 'Item removido do carrinho com sucesso.',
  })
  async removeItemFromCart(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
  ) {
    await this.removeItemFromCartUseCase.execute(cartId, productId);
    return { message: 'Item removed from cart successfully' };
  }

  @Post('calculate-shipping')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Calcular frete com base na distância' })
  @ApiResponse({
    status: 200,
    description: 'Frete calculado com sucesso.',
  })
  async calculateShipping(
    @Req() req,
    @Body() body: { origins: string[]; destinations: string[] },
  ) {
    const distanceData = await this.calculateShippingUseCase.execute(
      body.origins,
      body.destinations,
      req.user.userId,
    );

    return { message: 'Shipping calculated successfully', distanceData };
  }
}
