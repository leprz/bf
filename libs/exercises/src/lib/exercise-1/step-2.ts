export class Product {
  constructor(public sku: string, public name: string, public price: number) {}
}

export class Customer {
  public readonly products: Product[] = [];

  constructor(public name: string, public money: number) {}

  buyProduct(product: Product): void {
    if (this.money < product.price) {
      throw new Error('Not enough money');
    }

    this.products.push(product);

    this.money -= product.price;
  }
}

export function buyProduct(customer: Customer, product: Product): void {
  customer.buyProduct(product);
}
