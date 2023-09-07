import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  public getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id', new ParseUUIDPipe()) id: Product['id']) {
    if (!this.productsService.getById(id)) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.productsService.getById(id);
  }

  @Delete('/:id')
  public deleteById(@Param('id', new ParseUUIDPipe()) id: Product['id']) {
    if (!this.productsService.getById(id)) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.productsService.delete(id);
    return { message: 'Product deleted' };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: Product['id'],
    @Body() productData: UpdateProductDTO,
  ) {
    if (!this.productsService.getById(id)) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.productsService.update(id, productData);
    return { message: 'Product updated' };
  }
}
