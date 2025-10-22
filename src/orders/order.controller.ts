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
} from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from '../orders/dto/create-order-dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar um Pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso.' })
  async createOrder(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.userId;
    const order = createOrderDto;
    await this.ordersService.createOrderService(userId, order);
    return { message: 'Order created', order: createOrderDto };
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todos os Pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de Pedidos retornada com sucesso.' })
  async getAllOrders(@Req() req) {
    const userId = req.user.userId;
    const orders = await this.ordersService.getAllOrdersService(userId);
    return { message: 'Orders retrieved', orders };
  }
}
{
}
