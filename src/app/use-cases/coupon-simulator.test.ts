import CouponRepositoryMemory from "../../infra/memory/coupon-repository";
import ItemRepositoryMemory from "../../infra/memory/item-repository";
import CouponSimulatorInput from "../dtos/coupon-simulator-input";
import CouponSimulator from "./coupon-simulator";

describe('Coupon Simulator', () => {
  test('Should simulate the price of an order with coupon applied', async () => {
    const input = new CouponSimulatorInput(
      '516.370.640-39',
      [
        {
          itemId: 1,
          quantity: 2
        },
        {
          itemId: 2,
          quantity: 1
        },
        {
          itemId: 3,
          quantity: 1
        }
      ],
      "VALE20"
    );

    const couponSimulator = new CouponSimulator(new ItemRepositoryMemory(), new CouponRepositoryMemory());

    const total = await couponSimulator.execute(input);

    expect(total).toBe(3680);
  })
})