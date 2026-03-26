import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  create(data: {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    attributes?: Array<{ name: string; value: string }>;
    images?: Array<{ url: string; altText?: string }>;
  }) {
    return this.prisma.product.create({
      data: {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        attributes: {
          create:
            data.attributes?.map((attr) => ({
              name: attr.name,
              value: attr.value,
            })) || [],
        },
        images: {
          create:
            data.images?.map((img) => ({
              url: img.url,
              altText: img.altText,
            })) || [],
        },
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });
  }

  updateById(
    id: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
      categoryId?: string;
    },
  ) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  deleteById(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
