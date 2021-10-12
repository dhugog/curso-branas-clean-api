import ItemRepository from "../../domain/repositories/item-repository";
import Order from "../../domain/entities/order";
import OrderRepository from "../../domain/repositories/order-repository";
import PlaceOrderInput from "../dtos/place-order-input";

export default class PlaceOrder {
  constructor(readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository) {

  }

  async execute(input: PlaceOrderInput): Promise<any> {
    const order = new Order(input.cpf);

    for (const { itemId, quantity } of input.items) {
      const itemToAdd = await this.itemRepository.getById(itemId);

      if (!itemToAdd) {
        throw new Error('Item not found');
      }

      order.addItem(itemToAdd, quantity);
    }

    await this.orderRepository.save(order);

    return {
      total: order.getTotal()
    }
  }
}