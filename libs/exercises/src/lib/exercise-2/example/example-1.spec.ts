import {
  Product,
  productUtils
} from "./example-1";

describe('Exercise 2 - Example 1', () => {
  test('', () => {
    const products: Product[] = [
      {
        sku: '1',
        price: 20,
        name: 'Red apple'
      },
      {
        sku: '2',
        price: 30,
        name: 'Green apple'
      }
    ];

    console.log('findBySku', productUtils.findBySku('1', products));
    console.log('mapToSku', productUtils.mapToSku(products));
    console.log('convertToRecord', productUtils.convertToRecord(products));
    console.log('sumPrices', productUtils.sumPrices(products));
  });
});
