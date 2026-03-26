import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsController } from './product.controller';
import { ProductsRepository } from './repositories/products.repository';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';
import { GetAllProductsUseCase } from './use-cases/get-all-products.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    ProductsRepository,
    CreateProductUseCase,
    GetAllProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
