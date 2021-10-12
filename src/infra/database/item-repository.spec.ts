import Item from "../../domain/entities/item";
import DatabaseConnectionMongodbAdapter from "./database-connection-mongodb-adapter";
import ItemRepositoryDatabase from "./item-repository"

describe('Item Repository Database', () => {
  test('Should get an item by id with success', async () => {
    const itemRepositoryDatabase = new ItemRepositoryDatabase(new DatabaseConnectionMongodbAdapter());

    const item = await itemRepositoryDatabase.getById(1);

    expect(item).toBeInstanceOf(Item);
    expect(item?.id).toBe(1);
  })
})