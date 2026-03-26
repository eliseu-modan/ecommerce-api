import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { CreateCategoryUseCase } from './use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from './use-cases/delete-category.use-case';
import { GetAllCategoriesUseCase } from './use-cases/get-all-categories.use-case';
import { UpdateCategoryUseCase } from './use-cases/update-category.use-case';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Criar uma categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
  async createCategory(@Body() categoryDto: CreateCategoryDto) {
    const category = await this.createCategoryUseCase.execute(categoryDto);
    return { message: 'Category created', category };
  }

  @Get()
  @ApiOperation({ summary: 'Trazer todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso.',
  })
  getAllCategories() {
    return this.getAllCategoriesUseCase.execute();
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualizar uma categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso.',
  })
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryDto: CreateCategoryDto,
    @Res() res,
  ) {
    await this.updateCategoryUseCase.execute(id, categoryDto);
    return res.status(200).json({ message: 'Category updated successfully' });
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Deletar uma categoria' })
  @ApiResponse({ status: 200, description: 'Categoria deletada com sucesso.' })
  async deleteCategory(@Param('id') id: string, @Res() res) {
    await this.deleteCategoryUseCase.execute(id);
    return res.status(200).json({ message: 'Category deleted successfully' });
  }
}
