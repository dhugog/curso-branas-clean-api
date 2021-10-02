import Coupon from "./coupon";
import Item from "./item";
import Order from "./order";

describe('Order', () => {
  test('Should throw if instantiated with an invalid CPF', () => {
    expect(() => new Order('516.370.640-49')).toThrowError('CPF Inválido');
  })

  test('Should instantiate a order with success', () => {
    const order = new Order('516.370.640-39');

    expect(order).toBeDefined();
  })

  test('Should instantiate a order with 3 items', () => {
    const order = new Order('516.370.640-39');

    order.addItem(new Item(1, 'Eletrodomésticos', 'Câmera', 800, { height: 20, width: 15, depth: 10 }, 1), 2);
    order.addItem(new Item(2, 'Eletrodomésticos', 'Guitarra', 1000, { height: 100, width: 30, depth: 10 }, 3), 1);
    order.addItem(new Item(3, 'Eletrodomésticos', 'Geladeira', 2000, { height: 200, width: 100, depth: 50 }, 40), 1);

    const total = order.getTotal();

    expect(total).toBe(4600);
  })

  test('Should throw if instantiated with an invalid discount coupon', () => {
    const order = new Order('516.370.640-39');

    expect(() => order.addCoupon(new Coupon("VALE20", 20, new Date('2021-10-01'))))
      .toThrowError("Cupom inválido");
  })

  test('Should instantiate a order with 3 items and with discount coupon', () => {
    const order = new Order('516.370.640-39');

    order.addItem(new Item(1, 'Eletrodomésticos', 'Câmera', 800, { height: 20, width: 15, depth: 10 }, 1), 2);
    order.addItem(new Item(2, 'Eletrodomésticos', 'Guitarra', 1000, { height: 100, width: 30, depth: 10 }, 3), 1);
    order.addItem(new Item(3, 'Eletrodomésticos', 'Geladeira', 2000, { height: 200, width: 100, depth: 50 }, 40), 1);

    order.addCoupon(new Coupon("VALE20", 20));

    const total = order.getTotal();

    expect(total).toBe(3680);
  })

  test('Should calculate order freight greater than the minimum with success', () => {
    const order = new Order('516.370.640-39');

    order.addItem(new Item(1, 'Eletrodomésticos', 'Câmera', 800, { height: 20, width: 15, depth: 10 }, 1), 1);
    order.addItem(new Item(2, 'Eletrodomésticos', 'Guitarra', 1000, { height: 100, width: 30, depth: 10 }, 3), 1);
    order.addItem(new Item(3, 'Eletrodomésticos', 'Geladeira', 2000, { height: 200, width: 100, depth: 50 }, 40), 1);

    const freight = order.getFreight(1000);

    expect(freight).toBe(439.99);
  })

  test('Should calculate order freight less than the minimum with success', () => {
    const order = new Order('516.370.640-39');

    order.addItem(new Item(1, 'Eletrodomésticos', 'Câmera', 800, { height: 20, width: 15, depth: 10 }, 1), 1);

    const freight = order.getFreight(500);

    expect(freight).toBe(10);
  })
})