import Coupon from "../../domain/entities/coupon";
import CouponRepository from "../../domain/repositories/coupon-repository";
import DatabaseConnection from "./database-connection";

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {

  }

  async getByCode(code: string): Promise<Coupon | null> {
    const coupon = await this.databaseConnection.table('coupons').where('code', code).first();

    if (coupon) {
      const { code: databaseCode, percentage, expirationDate } = coupon;

      return new Coupon(databaseCode, percentage, expirationDate);
    }

    return null;
  }
}