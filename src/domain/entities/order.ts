import Coupon from "./coupon";
import Cpf from "./cpf";
import Item from "./item";
import OrderItem from "./order-item";

export default class Order {
  private items: OrderItem[];
  private coupon: Coupon | undefined;
  private cpf: Cpf;
  private code: number | undefined;

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

  getItems(): OrderItem[] {
    return this.items;
  }

  getCoupon(): Coupon | undefined {
    return this.coupon;
  }

  getCpf(): Cpf {
    return this.cpf;
  }

  getCode(): number | undefined {
    return this.code;
  }

  setCode(code: number): void {
    this.code = code;
  }

  addItem(item: Item, quantity: number) {
    this.items.push(new OrderItem(item, item.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isValid()) {
      throw new Error("Cupom inválido");
    }

    this.coupon = coupon;
  }

  getTotal() {
    return this.items.reduce((total: number, item: OrderItem) => total + item.getTotal(), 0) * (1 - (this.coupon ? this.coupon.percentage / 100 : 0));
  }

  getFreight(distance: number) {
    const freight = this.items.reduce((total: number, item: OrderItem) => total + item.calculateFreight(distance), 0);

    return freight < 10 ? 10 : freight;
  }
}