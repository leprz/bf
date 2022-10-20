export class Product {
  constructor(public sku: string, public name: string, public price: number) {}

  sellToCustomer(customer: Customer): void {
    customer.buyProduct(this, this.price);
  }
}

export class Customer {
  public readonly products: Product[] = [];

  constructor(public name: string, public money: number) {}

  buyProduct(product: Product, price: number): void {
    if (this.money < price) {
      throw new Error('Not enough money');
    }

    this.products.push(product);

    this.money -= price;
  }
}

export function buyProduct(customer: Customer, product: Product): void {
  product.sellToCustomer(customer);
}
