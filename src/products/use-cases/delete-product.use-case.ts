import { ConflictException, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string) {
    const existingProduct = await this.productsRepository.findById(id);

    if (!existingProduct) {
      throw new ConflictException('Product with this ID does not exist');
    }

    await this.productsRepository.deleteById(id);
    return { message: 'Product deleted successfully' };
  }
}
