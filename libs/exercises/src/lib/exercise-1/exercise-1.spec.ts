import { buyProduct, Customer, Product } from './step-1';

const redApple = new Product('1', 'Red apple', 20);

describe('Buying the product by customer', () => {
  const johnDoe = new Customer('John Doe', 50);
  buyProduct(johnDoe, redApple);

  test('Customer have an apple', () => {
    expect(johnDoe.products).toStrictEqual([redApple]);
  });

  test('Customer paid for an apple', () => {
    expect(johnDoe.money).toStrictEqual(30);
  });
});

describe('Buying the product when customer have not enough money', () => {
  const johnDoe = new Customer('John Doe', 15);
  it('Should not be possible', () => {
    expect(() => {
      buyProduct(johnDoe, redApple);
    }).toThrow('Not enough money');
  });
});
