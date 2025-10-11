import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/CreateCategoryDto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategoryService(categoryDto: CreateCategoryDto) {
    const { id, name, description } = categoryDto;

    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this ID already exists');
    }

    const category = await this.prisma.category.create({
      data: {
        id,
        name,
        description,
      },
    });
    return { message: 'Category created successfully', category };
  }

  async getAllCategoriesService() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async updateCategoryService(id, categoryDto: CreateCategoryDto) {
    const { name, description } = categoryDto;
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      throw new ConflictException('Category not found');
    }
    await this.prisma.category.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
  }

  async deleteCategoryService(id: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      throw new ConflictException('Category not found');
    }
    await this.prisma.category.delete({
      where: { id },
    });
  }
}
