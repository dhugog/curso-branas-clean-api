import Item from "../../domain/entities/item";
import ItemRepositoryMemory from "./item-repository";

describe('Item Repository Memory', () => {
  test('Should get item by id with success', async () => {
    const itemRepositoryMemory = new ItemRepositoryMemory();

    const item = await itemRepositoryMemory.getById(1);

    expect(item).toBeInstanceOf(Item);
    expect(item?.id).toBe(1);
  })
})