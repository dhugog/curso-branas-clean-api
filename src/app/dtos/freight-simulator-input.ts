export default class FreightSimulatorInput {
  constructor(readonly orderItems: Array<{ itemId: number, quantity: number }>, readonly distance: number) {

  }
}