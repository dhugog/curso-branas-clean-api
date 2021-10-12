import Item from "../../domain/entities/item";
import ItemRepository from "../../domain/repositories/item-repository";

export default class ItemRepositoryMemory implements ItemRepository {
  private items: Item[];

  constructor() {
    this.items = [
      new Item(1, 'Eletrodomésticos', 'Câmera', 800, { height: 20, width: 15, depth: 10 }, 1),
      new Item(2, 'Eletrodomésticos', 'Guitarra', 1000, { height: 100, width: 30, depth: 10 }, 3),
      new Item(3, 'Eletrodomésticos', 'Geladeira', 2000, { height: 200, width: 100, depth: 50 }, 40)
    ]
  }

  getById(id: number): Promise<Item | null> {
    return Promise.resolve(this.items.find(item => item.id === id) || null);
  }
}