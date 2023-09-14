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
import { CreateOrderDTO } from 'src/orders/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/orders/dtos/update-order.dto';
import { Order } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get('/')
  getAll() {
    return this.orderService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: Order['id']) {
    const order = await this.orderService.getById(id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);

    return order;
  }

  @Delete('/:id')
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: Order['id']) {
    const order = await this.orderService.getById(id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);

    await this.orderService.delete(id);
    return { message: 'Order deleted' };
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.orderService.create(orderData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    const order = await this.orderService.getById(id);
    if (!order) throw new NotFoundException('Order not found');

    await this.orderService.update(id, orderData);
    return { message: 'Order updated' };
  }
}
