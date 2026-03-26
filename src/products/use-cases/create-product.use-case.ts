import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(productDto: CreateProductDto) {
    const {
      id,
      name,
      description,
      price,
      stock,
      categoryId,
      attributes,
      images,
    } = productDto;

    const existingProduct = id
      ? await this.productsRepository.findById(id)
      : null;

    if (existingProduct) {
      throw new ConflictException('Product with this ID already exists');
    }

    const product = await this.productsRepository.create({
      id,
      name,
      description,
      price,
      stock,
      categoryId,
      attributes,
      images,
    });

    return { message: 'Product created successfully', product };
  }
}
