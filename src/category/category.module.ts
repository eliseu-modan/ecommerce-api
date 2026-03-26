import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryUseCase } from './use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from './use-cases/delete-category.use-case';
import { GetAllCategoriesUseCase } from './use-cases/get-all-categories.use-case';
import { UpdateCategoryUseCase } from './use-cases/update-category.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    CategoryRepository,
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
