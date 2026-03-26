import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order-dto';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { GetAllOrdersUseCase } from './use-cases/get-all-orders.use-case';

@Controller('order')
export class OrdersController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar um Pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso.' })
  async createOrder(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const order = await this.createOrderUseCase.execute(
      req.user.userId,
      createOrderDto,
    );

    return { message: 'Order created', order };
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todos os Pedidos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Pedidos retornada com sucesso.',
  })
  async getAllOrders(@Req() req) {
    const orders = await this.getAllOrdersUseCase.execute(req.user.userId);
    return { message: 'Orders retrieved', orders };
  }
}
