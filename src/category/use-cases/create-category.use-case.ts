import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/CreateCategoryDto';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(categoryDto: CreateCategoryDto) {
    const { id, name, description } = categoryDto;

    const existingCategory = id
      ? await this.categoryRepository.findById(id)
      : null;

    if (existingCategory) {
      throw new ConflictException('Category with this ID already exists');
    }

    const category = await this.categoryRepository.create({
      id,
      name,
      description,
    });

    return { message: 'Category created successfully', category };
  }
}
