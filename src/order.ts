import Coupon from "./coupon";
import Cpf from "./cpf";
import Item from "./item";
import OrderItem from "./order-item";

export default class Order {
  private cpf: Cpf;
  private items: OrderItem[];
  private coupon: Coupon | undefined;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);

    try {
      if (!this.cpf.isValid())
        throw new Error;
    } catch (error) {
      throw new Error('CPF Inválido');
    }

    this.items = [];
  }

  addItem = (item: Item, quantity: number) =>
    this.items.push(new OrderItem(item, item.price, quantity));

  addCoupon = (coupon: Coupon) => {
    if (!coupon.isValid()) {
      throw new Error("Cupom inválido");
    }

    this.coupon = coupon;
  }

  getTotal = () =>
    this.items.reduce((total: number, item: OrderItem) => total + item.getTotal(), 0) * (1 - (this.coupon ? this.coupon.percentage / 100 : 0));

  getFreight = (distance: number) => {
    const freight = this.items.reduce((total: number, item: OrderItem) => total + item.calculateFreight(distance), 0);

    if (freight < 10) {
      return 10;
    }

    return freight;
  }

}