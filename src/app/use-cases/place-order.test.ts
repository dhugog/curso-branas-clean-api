import ItemRepositoryMemory from "../../infra/memory/item-repository";
import OrderRepositoryMemory from "../../infra/memory/order-repository";
import PlaceOrderInput from "../dtos/place-order-input";
import PlaceOrder from "./place-order";

describe('Place Order', () => {
  test('Should place a order', async () => {
    const input = new PlaceOrderInput(
      '516.370.640-39',
      [
        {
          itemId: 1,
          quantity: 2
        },
        {
          itemId: 2,
          quantity: 1
        }
      ]
    );

    const orderRepositoryMemory = new OrderRepositoryMemory();

    const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), orderRepositoryMemory);
    const response = await placeOrder.execute(input);

    expect(response.total).toBe(2600);
    expect(await orderRepositoryMemory.getAll()).toHaveLength(1);
  })
})