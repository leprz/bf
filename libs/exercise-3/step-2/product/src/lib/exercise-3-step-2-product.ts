export interface Buyer {
  buyProduct(product: Product, price: number): void;
}

export class Product {
  constructor(
    private sku: string,
    private name: string,
    private price: number
  ) {
  }

  sell(buyer: Buyer): void {
    buyer.buyProduct(this, this.price);
  }

  static findBySku(sku: string, products: Product[]): Product | null {
    return products.find((product) => product.sku === sku) ?? null;
  }

  static removeBySku(sku: string, products: Product[]): Product[] {
    return products.filter(product => product.sku === sku);
  }
}
