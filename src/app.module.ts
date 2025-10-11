import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/product.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { PrismaService } from './prisma.service';
import { MailService } from './services/mail.service';
import { CategoryModule } from './category/category.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { DistanceMatrixService } from './services/distance-matrix.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoryModule,
    ShoppingCartModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, MailService, DistanceMatrixService],
  exports: [PrismaService, MailService, DistanceMatrixService],
})
export class AppModule {}
