import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'src/db';
import { CreateOrderDTO } from 'src/products/dtos/create.order.dto';
import { UpdateOrderDTO } from 'src/products/dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get('/')
  public getAll(): Order[] {
    return this.orderService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id', new ParseUUIDPipe()) id: Order['id']) {
    if (!this.orderService.getById(id)) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return this.orderService.getById(id);
  }

  @Delete('/:id')
  public deleteById(@Param('id', new ParseUUIDPipe()) id: Order['id']) {
    if (!this.orderService.getById(id)) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    this.orderService.delete(id);
    return { message: 'Order deleted' };
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.orderService.create(orderData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: Order['id'],
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!this.orderService.getById(id)) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    this.orderService.update(id, orderData);
    return { message: 'Order updated' };
  }
}
