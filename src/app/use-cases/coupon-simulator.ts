import Coupon from "../../domain/entities/coupon";
import Order from "../../domain/entities/order";
import CouponRepository from "../../domain/repositories/coupon-repository";
import ItemRepository from "../../domain/repositories/item-repository";
import CouponSimulatorInput from "../dtos/coupon-simulator-input";

export default class CouponSimulator {
  constructor(readonly itemRepository: ItemRepository, readonly couponRepository: CouponRepository) {

  }

  async execute({ cpf, orderItems, couponCode }: CouponSimulatorInput): Promise<number> {
    const order = new Order(cpf);

    this.applyItemsToOrder(order, orderItems);

    const coupon = await this.couponRepository.getByCode(couponCode);

    if (!coupon || !coupon.isValid()) {
      throw new Error(`Invalid coupon ${couponCode}`);
    }

    order.addCoupon(coupon);

    return order.getTotal();
  }

  private async applyItemsToOrder(order: Order, items: Array<{ itemId: number, quantity: number }>): Promise<void> {
    const promises = items.map(async ({ itemId, quantity }) => {
      const item = await this.itemRepository.getById(itemId);

      if (!item) {
        throw new Error(`Item ${itemId} not found`);
      }

      order.addItem(item, quantity);
    })

    await Promise.all(promises);
  }
}