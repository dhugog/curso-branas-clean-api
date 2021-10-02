export default class Item {
  constructor(
    readonly id: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly dimensions: { height: number, width: number, depth: number },
    readonly weight: number
  ) {

  }

  getVolume = () => {
    const { height, width, depth } = this.dimensions;

    return height * width * depth / 100 ** 3;
  }

  getDensity = (volume?: number) => {
    if (!volume) {
      volume = this.getVolume();
    }

    return this.weight / volume;
  }
}