import Order from "../../domain/entities/order";
import OrderRepository from "../../domain/repositories/order-repository";

export default class OrderRepositoryMemory implements OrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  save(order: Order): Promise<Order> {
    order.setCode(this.incrementId());

    this.orders.push(order);

    return Promise.resolve(order);
  }

  getAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  private incrementId(): number {
    const lastId = Number([...this.orders].pop()?.getCode());

    return lastId ? lastId + 1 : Number(`${new Date().getFullYear()}${'1'.padStart(8, '0')}`);
  }
}