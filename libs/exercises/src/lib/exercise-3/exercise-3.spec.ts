import {
  buyProduct,
  Customer,
  Product,
  resupply,
  Shop,
  Supplier
} from "./step-1";

const redAppleSku = '1';
const redApplePrice = 20;
const redApple = new Product(redAppleSku, 'Red apple', redApplePrice);

describe('Buying the product by customer', () => {
  const walmart = new Shop('Walmart', 0);
  walmart.stock.push(redApple);

  const johnDoe = new Customer('John Doe', 50);

  buyProduct(redAppleSku, johnDoe, walmart);

  test('Customer have an apple', () => {
    expect(johnDoe.products).toStrictEqual([redApple]);
  });

  test('Customer paid for an apple', () => {
    expect(johnDoe.money).toStrictEqual(30);
    expect(walmart.money).toStrictEqual(redApplePrice);
  });
});

describe('Buying the product when customer have not enough money', () => {
  const supplier = new Shop('Supplier', 0);
  supplier.stock.push(redApple);

  const johnDoe = new Customer('John Doe', 15);

  it('Should not be possible', () => {
    expect(() => {
      buyProduct(redAppleSku, johnDoe, supplier);
    }).toThrow('Not enough money');
  });
});

describe('Buying not available product', () => {
  const supplier = new Shop('Supplier', 0);
  const johnDoe = new Customer('John Doe', 15);

  it('Should not be possible', () => {
    expect(() => {
      buyProduct(redAppleSku, johnDoe, supplier)
    }).toThrow(('Product [1] is not available'))
  });
});

describe('Shop resupply product', () => {
  const supplierMoney = 50;
  const supplier = new Shop('Supplier', supplierMoney);
  const producerOfApples = new Supplier('Apple Orchard', [redApple]);

  it ('Should be possible when product is available in the warehouse', () => {
    resupply('1', supplier, producerOfApples);
    expect(supplier.stock).toContain(redApple);
    expect(supplier.money).toStrictEqual(supplierMoney - redApplePrice);
  });

  it ('Should not be possible when product is not available in warehouse', () => {
    expect(() => {
      resupply('2', supplier, producerOfApples);
    }).toThrow('[2] is not produced by [Apple Orchard]');
  });
});
