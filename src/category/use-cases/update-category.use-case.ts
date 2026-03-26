import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/CreateCategoryDto';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string, categoryDto: CreateCategoryDto) {
    const { name, description } = categoryDto;
    const existingCategory = await this.categoryRepository.findById(id);

    if (!existingCategory) {
      throw new ConflictException('Category not found');
    }

    await this.categoryRepository.updateById(id, {
      name,
      description,
    });
  }
}
