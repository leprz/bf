export class Product {
  constructor(public sku: string, public name: string, public price: number) {}
}

export class Customer {
  public readonly products: Product[] = [];

  constructor(public name: string, public money: number) {}
}

export function buyProduct(customer: Customer, product: Product): void {
  if (customer.money < product.price) {
    throw new Error('Not enough money');
  }

  customer.products.push(product);

  customer.money -= product.price;
}
