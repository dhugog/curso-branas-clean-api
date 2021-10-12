import ItemRepositoryMemory from "../../infra/memory/item-repository";
import FreightSimulatorInput from "../dtos/freight-simulator-input";
import FreightSimulator from "./freight-simulator"

describe('Freight Simulator', () => {
  test('Should simulate the freight of given items with success', async () => {
    const input = new FreightSimulatorInput([
      {
        itemId: 1,
        quantity: 1
      },
      {
        itemId: 2,
        quantity: 1
      },
      {
        itemId: 3,
        quantity: 1
      }
    ], 1000);

    const freightSimulator = new FreightSimulator(new ItemRepositoryMemory());

    const freight = await freightSimulator.execute(input);

    expect(freight).toBe(439.99);
  })
})