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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './product.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Criar um produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
  async createProduct(@Body() productDto: CreateProductDto) {
    await this.productsService.createProductService(productDto);
    return { message: 'Product created', product: productDto };
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Trazer todos os produtos' })
  @UseGuards()
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
  })
  async getAllProducts(@Req() req, @Res() res) {
    const products = await this.productsService.getAllProductsService();
    return res.status(200).json(products);
  }
  
  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.' })
  async updateProduct(
    @Req() req,
    @Res() res,
    @Body() productDto: CreateProductDto,
  ) {
    const { id } = req.params;
    await this.productsService.updateProductService(id, productDto);
    return res.status(200).json({ message: 'Product updated successfully' });
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Deletar um produto' })
  @ApiResponse({ status: 200, description: 'Produto deletado com sucesso.' })
  async deleteProduct(@Req() req, @Res() res) {
    const { id } = req.params;
    await this.productsService.deleteProductService(id);
    return res.status(200).json({ message: 'Product deleted successfully' });
  }
}
{
}
