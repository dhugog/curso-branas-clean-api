import Item from "../../domain/entities/item";
import Order from "../../domain/entities/order";
import OrderRepositoryMemory from "./order-repository";

describe('Order Repository Memory', () => {
  test('Should get all orders with success', async () => {
    const orderRepositoryMemory = new OrderRepositoryMemory();

    const orders = await orderRepositoryMemory.getAll();

    expect(orders).toBeInstanceOf(Array);
  })

  test('Should save an order with success', async () => {
    const orderRepositoryMemory = new OrderRepositoryMemory();

    const order = new Order('516.370.640-39');
    order.addItem(new Item(1, 'Eletrodomésticos', 'Câmera', 800, { height: 20, width: 15, depth: 10 }, 1), 2);
    order.addItem(new Item(2, 'Eletrodomésticos', 'Guitarra', 1000, { height: 100, width: 30, depth: 10 }, 3), 1);
    order.addItem(new Item(3, 'Eletrodomésticos', 'Geladeira', 2000, { height: 200, width: 100, depth: 50 }, 40), 1);

    await orderRepositoryMemory.save(order);

    const orders = await orderRepositoryMemory.getAll();

    expect(orders).toHaveLength(1);
  })
})