import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { DistanceMatrixService } from '../services/distance-matrix.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [PrismaService, ShoppingCartService, DistanceMatrixService],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
