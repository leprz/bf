
function calculateSellPrice(price: {
  net: number,
  vat: number
}): number {
  return price.net * (1+price.vat/100);
}


describe('Calculate sell price', () => {
  test('Vat is added to base price', () => {
    expect(calculateSellPrice({
      net: 10,
      vat: 23
    })).toStrictEqual(12.3);
  });
});
