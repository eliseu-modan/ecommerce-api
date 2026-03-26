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
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { DeleteProductUseCase } from './use-cases/delete-product.use-case';
import { GetAllProductsUseCase } from './use-cases/get-all-products.use-case';
import { UpdateProductUseCase } from './use-cases/update-product.use-case';

@Controller('product')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Criar um produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
  async createProduct(@Body() productDto: CreateProductDto) {
    const product = await this.createProductUseCase.execute(productDto);
    return { message: 'Product created', product };
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Trazer todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
  })
  async getAllProducts(@Res() res) {
    const products = await this.getAllProductsUseCase.execute();
    return res.status(200).json(products);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.' })
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: CreateProductDto,
    @Res() res,
  ) {
    await this.updateProductUseCase.execute(id, productDto);
    return res.status(200).json({ message: 'Product updated successfully' });
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Deletar um produto' })
  @ApiResponse({ status: 200, description: 'Produto deletado com sucesso.' })
  async deleteProduct(@Param('id') id: string, @Res() res) {
    await this.deleteProductUseCase.execute(id);
    return res.status(200).json({ message: 'Product deleted successfully' });
  }
}
