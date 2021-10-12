import Coupon from "../../domain/entities/coupon";
import CouponRepositoryDatabase from "./coupon-repository"
import DatabaseConnectionMongodbAdapter from "./database-connection-mongodb-adapter";

describe('Coupon Repository Database', () => {
  test('Should get coupon by code with success', async () => {
    const couponRepositoryDatabase = new CouponRepositoryDatabase(new DatabaseConnectionMongodbAdapter());

    const coupon = await couponRepositoryDatabase.getByCode('VALE20');

    expect(coupon).toBeInstanceOf(Coupon);
    expect(coupon?.code).toBe('VALE20');
  })
})