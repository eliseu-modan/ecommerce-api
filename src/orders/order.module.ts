import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrdersController } from './order.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { CreateOrderUseCase } from './use-cases/create-order.use-case';
import { GetAllOrdersUseCase } from './use-cases/get-all-orders.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [OrdersRepository, CreateOrderUseCase, GetAllOrdersUseCase],
  controllers: [OrdersController],
})
export class OrdersModule {}
