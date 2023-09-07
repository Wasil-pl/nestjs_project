import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, db } from 'src/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }
  public getById(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }
  public delete(id: Order['id']): void {
    db.orders = db.orders.filter((order) => order.id !== id);
  }
  public create(orderData: Omit<Order, 'id'>): Order {
    const productExist = db.products.find(
      (product) => product.id === orderData.productId,
    );
    if (!productExist) {
      throw new NotFoundException(
        `Product with id ${orderData.productId} not found`,
      );
    }
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }
  public update(id: Order['id'], orderData: Omit<Order, 'id'>): void {
    const productExist = db.products.find(
      (product) => product.id === orderData.productId,
    );
    if (!productExist) {
      throw new NotFoundException(
        `Product with id ${orderData.productId} not found`,
      );
    }
    db.orders = db.orders.map((order) =>
      order.id === id ? { ...order, ...orderData } : order,
    );
  }
}
