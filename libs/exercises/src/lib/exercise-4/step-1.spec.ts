interface Product {
  sku: string;
  price: {
    net: number;
    vat: number;
  },
  name: string;
  description: string;
}

function calculateSellPrice(product: Product): number {
  return product.price.net * (1+product.price.vat/100);
}

describe('Calculate sell price', () => {
  test('Vat is added to base price', () => {
    const product: Product = {
      description: '',
      sku: '1',
      name: '',
      price: {
        net: 10,
        vat: 23
      }
    };
    expect(calculateSellPrice(product)).toStrictEqual(12.3);
  });
});
