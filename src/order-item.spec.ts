import Item from "./item";
import OrderItem from "./order-item"

describe('Order Item', () => {
  test('Should instantiate an Order Item with success', () => {
    const item = new Item(1, 'Teste', 'Produto teste', 10, { width: 10, height: 10, depth: 10 }, 1);
    const orderItem = new OrderItem(item, 10, 1);

    expect(orderItem).toBeDefined();
  })

  test('Should calculate total with success', () => {
    const item = new Item(1, 'Teste', 'Produto teste', 10, { width: 10, height: 10, depth: 10 }, 1);
    const orderItem = new OrderItem(item, 10, 2);
    const total = orderItem.getTotal();

    expect(total).toBe(20);
  })

  test('Should calculate freight with success', () => {
    const item = new Item(3, 'Eletrodomésticos', 'Geladeira', 2000, { height: 200, width: 100, depth: 50 }, 40);
    const orderItem = new OrderItem(item, 2000, 1);
    const freight = orderItem.calculateFreight(1000);

    expect(freight).toBe(400);
  })
})