export class Product {
  constructor(private sku: string, private name: string, public price: number) {
  }

  sellToCustomer(customer: Customer): number {
    return customer.buyProduct(this, this.price);
  }


  sellToShop(shop: Shop): void {
    shop.buyProduct(this, this.price);
  }

  static findBySku(sku: string, products: Product[]): Product | null {
    return products.find((product) => product.sku === sku) ?? null;
  }

  static removeBySku(sku: string, products: Product[]): Product[] {
    return products.filter(product => product.sku === sku);
  }
}

export class Customer {
  public readonly products: Product[] = [];

  constructor(public name: string, public money: number) {
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

export class Shop {
  public stock: Product[] = [];

  constructor(
    public name: string,
    public money: number
  ) {
  }

  buyProduct(product: Product, price: number): void {
    this.stock.push(product);
    this.money -= price;
  }

  sellToCustomer(sku: string, customer: Customer): void {
    const product = Product.findBySku(sku, this.stock);

    if (product) {
      const price = product.sellToCustomer(customer);
      this.money += price;
    } else {
      throw new Error(`Product [${sku}] is not available`);
    }

    this.stock = Product.removeBySku(sku, this.stock);
  }
}

export class Supplier {
  sellToShop(sku: string, shop: Shop): void {
    const product = Product.findBySku(sku, this.availableProducts);
    if (product) {
      product.sellToShop(shop);
    } else {
      throw new Error(`[${sku}] is not produced by [${this.name}]`);
    }
  }

  constructor(public readonly name: string, public readonly availableProducts: Product[]) {
  }
}

export function resupply(sku: string, shop: Shop, supplier: Supplier): void {
  supplier.sellToShop(sku, shop);
}

export function buyProduct(sku: string, customer: Customer, shop: Shop): void {
  shop.sellToCustomer(sku, customer);
}
