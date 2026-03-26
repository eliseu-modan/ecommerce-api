import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string) {
    const existingCategory = await this.categoryRepository.findById(id);

    if (!existingCategory) {
      throw new ConflictException('Category not found');
    }

    await this.categoryRepository.deleteById(id);
  }
}
