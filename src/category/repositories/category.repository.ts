import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  create(data: { id?: string; name: string; description?: string }) {
    return this.prisma.category.create({
      data,
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  updateById(
    id: string,
    data: {
      name?: string;
      description?: string;
    },
  ) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  deleteById(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
