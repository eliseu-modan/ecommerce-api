import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddItemCartDto } from './dto/add-item-cart';
import { ShoppingCartService } from './shopping-cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCart: ShoppingCartService) {}

  @Post('add-item-to-cart')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Adicionar item ao carrinho' })
  @ApiResponse({
    status: 201,
    description: 'Item adicionado ao carrinho com sucesso.',
  })
  async addItemToCart(@Req() req, @Body() itemDto: AddItemCartDto) {
    const userId = req.user.userId;
    const cartItem = await this.shoppingCart.addItemToCart(itemDto, userId);
    return { message: 'Item added to cart', item: itemDto, cartItem };
  }

  @Get('get-cart')
  @ApiOperation({ summary: 'Obter carrinho do usuário' })
  @ApiResponse({
    status: 201,
    description: 'Item adicionado ao carrinho com sucesso.',
  })
  async getCart(@Req() req) {
    const userId = "0d87985a-22e4-4378-9c35-239d5567d2a6";
    const cart = await this.shoppingCart.getCart(userId);
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
    const cart = await this.shoppingCart.updateItemQuantity(
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
    await this.shoppingCart.removeItemFromCart(cartId, productId);
    return { message: 'Item removed from cart successfully' };
  }

  @Post('calculate-shipping')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Calcular frete com base na distância' })
  @ApiResponse({
    status: 200,
    description: 'Frete calculado com sucesso.',
  })
  async calculateShipping(@Req() req, @Body() body: { origins: string[], destinations: string[] }) {
    const userId = req.user.userId;
    const distanceData = await this.shoppingCart.calculateShipping(body.origins, body.destinations, userId);
    return { message: 'Shipping calculated successfully', distanceData };
  }
}

{
}
