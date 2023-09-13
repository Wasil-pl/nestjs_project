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
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  public async getAll(): Promise<Product[]> {
    const products = await this.productsService.getAll();
    return products;
  }

  @Get('/extended')
  public async getAllExtended(): Promise<Product[]> {
    const products = await this.productsService.getAllExtended();
    return products;
  }

  @Get('/:id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: Product['id']) {
    const product = await this.productsService.getById(id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  @Get('/extended/:id')
  public async getByIdExtended(
    @Param('id', new ParseUUIDPipe()) id: Product['id'],
  ) {
    const product = await this.productsService.getByIdExtended(id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  @Delete('/:id')
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: Product['id']) {
    const product = await this.productsService.getById(id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    await this.productsService.delete(id);
    return { message: 'Product deleted' };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    const product = await this.productsService.getById(id);
    if (!product) throw new NotFoundException('Product not found');

    await this.productsService.updateById(id, productData);
    return { message: 'Product updated' };
  }
}
