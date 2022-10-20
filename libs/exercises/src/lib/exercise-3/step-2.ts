export interface Buyer {
  buyProduct(product: Product, price: number): number;
}

export class Product {
  constructor(private sku: string, private name: string, public price: number) {
  }

  sell(buyer: Buyer): number {
    return buyer.buyProduct(this, this.price);
  }

  static findBySku(sku: string, products: Product[]): Product | null {
    return products.find((product) => product.sku === sku) ?? null;
  }

  static removeBySku(sku: string, products: Product[]): Product[] {
    return products.filter(product => product.sku === sku);
  }
}

export class Customer implements Buyer {
  public readonly products: Product[] = [];

  constructor(
    public name: string,
    public money: number
  ) {
  }

  buyProduct(product: Product, price: number): number {
    if (this.money < price) {
      throw new Error('Not enough money');
    }

    this.products.push(product);

    this.money -= price;

    return price;
  }
}

export class Shop implements Buyer {
  public stock: Product[] = [];

  constructor(
    public name: string,
    public money: number
  ) {
  }

  buyProduct(product: Product, price: number): number {
    this.stock.push(product);
    this.money -= price;
    return price;
  }

  sell(sku: string, buyer: Buyer): void {
    const product = Product.findBySku(sku, this.stock);

    if (product) {
      const price = product.sell(buyer);
      this.money += price;
    } else {
      throw new Error(`Product [${sku}] is not available`);
    }

    this.stock = Product.removeBySku(sku, this.stock);
  }
}

export class Supplier {
  constructor(
    public readonly name: string,
    public readonly availableProducts: Product[]
  ) {
  }

  sellToShop(sku: string, shop: Shop): void {
    const product = Product.findBySku(sku, this.availableProducts);

    if (product) {
      product.sell(shop);
    } else {
      throw new Error(`[${sku}] is not produced by [${this.name}]`);
    }
  }
}

export function resupply(sku: string, shop: Shop, warehouse: Supplier): void {
  warehouse.sellToShop(sku, shop);
}

export function buyProduct(sku: string, customer: Customer, shop: Shop): void {
  shop.sell(sku, customer);
}
