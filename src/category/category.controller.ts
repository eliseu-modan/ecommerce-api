import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @ApiOperation({ summary: 'Criar uma categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
  async createCategory(@Body() categoryDto: CreateCategoryDto) {
    await this.categoryService.createCategoryService(categoryDto);
    return { message: 'Category created', category: categoryDto };
  }

  @Get()
  @ApiOperation({ summary: 'Trazer todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso.',
  })
  getAllCategories() {
    return this.categoryService.getAllCategoriesService();
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualizar uma categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso.',
  })
  async updateCategory(
    @Req() req,
    @Res() res,
    @Body() categoryDto: CreateCategoryDto,
  ) {
    const { id } = req.params;
    await this.categoryService.updateCategoryService(id, categoryDto);
    return res.status(200).json({ message: 'Category updated successfully' });
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Deletar uma categoria' })
  @ApiResponse({ status: 200, description: 'Categoria deletada com sucesso.' })
  async deleteCategory(@Req() req, @Res() res) {
    const { id } = req.params;
    await this.categoryService.deleteCategoryService(id);
    return res.status(200).json({ message: 'Category deleted successfully' });
  }
}
