import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute() {
    return this.productsRepository.findAll();
  }
}
