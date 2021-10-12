export default class CouponSimulatorInput {
  constructor(readonly cpf: string, readonly orderItems: Array<{ itemId: number, quantity: number }>, readonly couponCode: string) {

  }
}