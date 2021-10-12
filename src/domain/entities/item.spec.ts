import Item from "./item";

describe('Item', () => {
  test('Should get item volume with success', () => {
    const item = new Item(1, 'Eletrodomésticos', 'Geladeira', 2000, { height: 200, width: 100, depth: 50 }, 40);
    const volume = item.getVolume();

    expect(volume).toBe(1);
  })

  test('Should get item density with success', () => {
    const item = new Item(1, 'Eletrodomésticos', 'Geladeira', 2000, { height: 200, width: 100, depth: 50 }, 40);
    const volume = item.getDensity();

    expect(volume).toBe(40);
  })

  test('Should throw error if try to calculate volume of an item without dimensions', () => {
    const item = new Item(1, 'Eletrodomésticos', 'Geladeira', 2000);

    expect(() => {
      item.getVolume();
    }).toThrowError('Dimensions not defined');
  })
})