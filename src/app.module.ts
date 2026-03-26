import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './orders/order.module';
import { PaymentModule } from './payment/payment.module';
import { ProductsModule } from './products/product.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    HttpModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoryModule,
    ShoppingCartModule,
    OrdersModule,
    PaymentModule,
  ],
})
export class AppModule {}
