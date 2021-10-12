import Order from "../../domain/entities/order";
import CouponRepository from "../../domain/repositories/coupon-repository";
import ItemRepository from "../../domain/repositories/item-repository";
import OrderRepository from "../../domain/repositories/order-repository";
import DatabaseConnection from "./database-connection";

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly databaseConnection: DatabaseConnection, readonly itemRepository: ItemRepository, readonly couponRepository: CouponRepository) {

  }

  async getAll(): Promise<Order[]> {
    const orderRows = await this.databaseConnection.table('orders').get();

    const orders = [];

    for (const orderRow of orderRows) {
      const order = new Order(orderRow.clientCpf);
      order.setCode(orderRow.code);

      const orderItems = await this.databaseConnection.table('orderItems').where('orderCode', orderRow.code).get();

      await this.appendItemsToOrder(order, orderItems);

      if (orderRow.couponCode) {
        await this.appendCouponToOrder(order, orderRow.couponCode);
      }

      orders.push(order);
    }

    return orders;
  }

  async save(order: Order): Promise<Order> {
    const nextCode = await this.incrementCode();
    order.setCode(nextCode);

    await this.databaseConnection.table('orders').insert({
      code: order.getCode(),
      clientCpf: order.getCpf().getUnmaskedCpf(),
      freight: order.getFreight(1000),
      total: order.getTotal(),
      couponCode: order.getCoupon()?.code,
      createdAt: new Date()
    });

    for (const orderItem of order.getItems()) {
      await this.databaseConnection.table('orderItems').insert({
        itemId: orderItem.item.id,
        orderCode: order.getCode(),
        price: orderItem.price,
        quantity: orderItem.quantity,
        total: orderItem.getTotal()
      });
    }

    return order;
  }

  private async incrementCode(): Promise<number> {
    const orders = await this.getAll();
    const lastCode = Number(orders.pop()?.getCode());

    return lastCode ? lastCode + 1 : Number(`${new Date().getFullYear()}${'1'.padStart(8, '0')}`);
  }

  private async appendItemsToOrder(order: Order, orderItems: Array<{ itemId: number, orderCode: number, price: number, quantity: number, total: number }>): Promise<Order> {
    for (const orderItem of orderItems) {
      const item = await this.itemRepository.getById(orderItem.itemId);

      if (!item) {
        throw new Error(`Item ${orderItem.itemId} not found`);
      }

      order.addItem(item, orderItem.quantity);
    }

    return order;
  }

  private async appendCouponToOrder(order: Order, couponCode: string): Promise<void> {
    const coupon = await this.couponRepository.getByCode(couponCode);

    if (!coupon) {
      throw new Error(`Coupon ${couponCode} not found`);
    }

    order.addCoupon(coupon);
  }
}