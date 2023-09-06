import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  public getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') id: Product['id']) {
    return this.productsService.getById(id);
  }

  @Delete('/:id')
  public deleteById(@Param('id') id: Product['id']) {
    this.productsService.delete(id);
    return { message: 'Product deleted' };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
}
