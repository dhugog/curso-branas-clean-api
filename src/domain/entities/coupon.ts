export default class Coupon {
  constructor(readonly code: string, readonly percentage: number, readonly expirationDate?: Date) {

  }

  isValid = () => !this.expirationDate || this.expirationDate > new Date();
}