import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string, productDto: CreateProductDto) {
    const { name, description, price, stock, categoryId } = productDto;
    const existingProduct = await this.productsRepository.findById(id);

    if (!existingProduct) {
      throw new ConflictException('Product with this ID does not exist');
    }

    await this.productsRepository.updateById(id, {
      name,
      description,
      price,
      stock,
      categoryId,
    });

    return { message: 'Product updated successfully' };
  }
}
