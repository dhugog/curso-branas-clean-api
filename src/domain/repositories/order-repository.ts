import Order from "../entities/order";

export default interface OrderRepository {
  save(order: Order): Promise<Order>;
  getAll(): Promise<Order[]>;
}