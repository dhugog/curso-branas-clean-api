import Coupon from "./coupon"

describe('Coupon', () => {
  test('Should validate an overdued coupon', () => {
    const coupon = new Coupon("TESTE", 10, new Date('2021-10-01'));

    const validationResult = coupon.isValid();

    expect(validationResult).toBeFalsy();
  })

  test('Should validate a valid coupon', () => {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    const coupon = new Coupon("TESTE", 10, tomorrow);

    const validationResult = coupon.isValid();

    expect(validationResult).toBeTruthy();
  })
})