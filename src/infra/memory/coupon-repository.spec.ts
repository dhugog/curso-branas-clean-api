import CouponRepositoryMemory from "./coupon-repository"

describe('Coupon Repository Memory', () => {
  test('Should get coupon by code with success', () => {
    const couponRepositoryMemory = new CouponRepositoryMemory();

    const coupon = couponRepositoryMemory.getByCode("VALE20");

    expect(coupon).not.toBeNull();
  })
})