import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute() {
    return this.categoryRepository.findAll();
  }
}
