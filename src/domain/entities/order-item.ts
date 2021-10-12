import Item from "./item";

export default class OrderItem {
  constructor(readonly item: Item, readonly price: number, readonly quantity: number) {

  }

  getTotal = () => this.price * this.quantity;

  calculateFreight = (distance: number) => {
    const itemVolume = this.item.getVolume();
    const itemDensity = this.item.getDensity(itemVolume);

    return distance * itemVolume * Number((itemDensity / 100).toFixed(2)) * this.quantity;
  }
}