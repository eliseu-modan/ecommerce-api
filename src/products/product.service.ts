import { Injectable, ConflictException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProductService(productDto: CreateProductDto) {
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

    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (existingProduct) {
      throw new ConflictException('Product with this ID already exists');
    }

    const product = await this.prisma.product.create({
      data: {
        id,
        name,
        description,
        price,
        stock,
        categoryId,
        attributes: {
          create:
            attributes?.map((attr) => ({
              name: attr.name,
              value: attr.value,
            })) || [],
        },
        images: {
          create:
            images?.map((img) => ({
              url: img.url,
              altText: img.altText,
            })) || [],
        },
      },
    });

    return { message: 'Product created successfully', product };
  }

  async getAllProductsService() {
    const products = await this.prisma.product.findMany({
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    return products;
  }

  async updateProductService(id: string, productDto: CreateProductDto) {
    const { name, description, price, stock, categoryId } = productDto;
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new ConflictException('Product with this ID does not exist');
    }
    await this.prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
      },
    });
    return { message: 'Product updated successfully' };
  }

  async deleteProductService(id: string) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new ConflictException('Product with this ID does not exist');
    }
    await this.prisma.product.delete({
      where: { id },
    });
    return { message: 'Product deleted successfully' };
  }
}
