import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DistanceMatrixService } from '../services/distance-matrix.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartRepository } from './repositories/shopping-cart.repository';
import { AddItemToCartUseCase } from './use-cases/add-item-to-cart.use-case';
import { CalculateShippingUseCase } from './use-cases/calculate-shipping.use-case';
import { GetCartUseCase } from './use-cases/get-cart.use-case';
import { RemoveItemFromCartUseCase } from './use-cases/remove-item-from-cart.use-case';
import { UpdateItemQuantityUseCase } from './use-cases/update-item-quantity.use-case';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [
    ShoppingCartRepository,
    DistanceMatrixService,
    AddItemToCartUseCase,
    GetCartUseCase,
    UpdateItemQuantityUseCase,
    RemoveItemFromCartUseCase,
    CalculateShippingUseCase,
  ],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
