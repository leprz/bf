import { Product } from "@bf/exercise-3/step-1/product";

export class Customer {
  public readonly products: Product[] = [];

  constructor(
    public name: string,
    public money: number
  ) {
  }

  buyProduct(product: Product, price: number): void {
    if (this.money < price) {
      throw new Error('Not enough money');
    }

    this.products.push(product);

    this.money -= price;
  }
}
