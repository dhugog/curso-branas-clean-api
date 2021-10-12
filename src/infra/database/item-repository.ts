import Item from "../../domain/entities/item";
import ItemRepository from "../../domain/repositories/item-repository";
import DatabaseConnection from "./database-connection";

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {

  }

  async getById(id: number): Promise<Item | null> {
    const item = await this.databaseConnection.table('items').where('id', id).first();

    if (item) {
      const { id: databaseId, category, description, price } = item;

      return new Item(databaseId, category, description, price);
    }

    return null;
  }
}