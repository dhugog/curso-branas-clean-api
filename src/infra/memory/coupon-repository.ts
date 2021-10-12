import Coupon from "../../domain/entities/coupon";
import CouponRepository from "../../domain/repositories/coupon-repository";

export default class CouponRepositoryMemory implements CouponRepository {
  private coupons: Coupon[];

  constructor() {
    this.coupons = [
      new Coupon("VALE20", 20)
    ]
  }

  getByCode(code: string): Promise<Coupon | null> {
    return Promise.resolve(this.coupons.find(coupon => coupon.code === code) || null);
  }
}