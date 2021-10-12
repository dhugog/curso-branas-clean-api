import Item from "../../domain/entities/item";
import Order from "../../domain/entities/order";
import CouponRepositoryDatabase from "./coupon-repository";
import DatabaseConnectionMongodbAdapter from "./database-connection-mongodb-adapter";
import ItemRepositoryDatabase from "./item-repository";
import OrderRepositoryDatabase from "./order-repository"

describe('Order Repository Database', () => {
  const makeDatabaseConnection = () => new DatabaseConnectionMongodbAdapter();

  const makeSut = (connection = makeDatabaseConnection()) => new OrderRepositoryDatabase(
    connection,
    new ItemRepositoryDatabase(connection),
    new CouponRepositoryDatabase(connection)
  );

  test('Should get all orders with success', async () => {
    const orderRepositoryDatabase = makeSut();

    const orders = await orderRepositoryDatabase.getAll();

    expect(orders).toBeInstanceOf(Array);
  })

  test('Should create an order with success', async () => {
    const orderRepositoryDatabase = makeSut();

    const order = new Order('516.370.640-39');
    order.addItem(new Item(1, 'Eletrodomésticos', 'Câmera', 800, { height: 20, width: 15, depth: 10 }, 1), 1);

    const createdOrder = await orderRepositoryDatabase.save(order);

    const orders = await orderRepositoryDatabase.getAll();

    const [lastOrder] = [...orders].reverse();

    expect(orders.length).toBeGreaterThanOrEqual(1);
    expect(lastOrder.getCode()).toBe(createdOrder.getCode());
  })
})