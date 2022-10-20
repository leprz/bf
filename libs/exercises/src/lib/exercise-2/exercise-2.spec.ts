import {
  buyProduct,
  Customer,
  Product,
  Shop
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
  const walmart = new Shop('Walmart', 0);
  walmart.stock.push(redApple);

  const johnDoe = new Customer('John Doe', 15);

  it('Should not be possible', () => {
    expect(() => {
      buyProduct(redAppleSku, johnDoe, walmart);
    }).toThrow('Not enough money');
  });
});

describe('Buying not available product', () => {
  const walmart = new Shop('Walmart', 0);
  const johnDoe = new Customer('John Doe', 15);

  it('Should not be possible', () => {
    expect(() => {
      buyProduct(redAppleSku, johnDoe, walmart)
    }).toThrow(('Product [1] is not available'))
  })
})
