import OrderItem from "../../domain/entities/order-item";
import ItemRepository from "../../domain/repositories/item-repository";
import FreightSimulatorInput from "../dtos/freight-simulator-input";

export default class FreightSimulator {
  constructor(readonly itemRepository: ItemRepository) {

  }

  async execute({ orderItems: requestedOrderItems, distance }: FreightSimulatorInput): Promise<number> {
    const orderItemsPromises = requestedOrderItems.map(async ({ itemId, quantity }) => {
      const item = await this.itemRepository.getById(itemId);

      if (!item) {
        throw new Error(`Item ${itemId} not found`);
      }

      return new OrderItem(item, item.price, quantity);
    })

    const orderItems = await Promise.all(orderItemsPromises);

    return orderItems.reduce((total: number, { calculateFreight }) =>
      total + calculateFreight(distance), 0
    );
  }
}