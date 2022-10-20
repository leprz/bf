export interface Product {
  sku: string;
  name: string;
  price: number;
}

function findBySku(sku: string, products: Product[]): Product | null {
  return products.find(product => product.sku === sku) ?? null;
}

function mapSku(products: Product[]): string[] {
  return products.map(product => product.sku);
}

function convertToRecord(products: Product[]): Record<string, Product> {
  return products.reduce<Record<string, Product>>(
    (acc, product) => ({...acc, [product.sku]: product }),
    {}
  );
}

function sumPrices(products: Product[]): number {
  return products.reduce<number>((
    acc, product) => acc + product.price,
    0
  );
}

export const productUtils = {
  findBySku,
  mapToSku: mapSku,
  convertToRecord,
  sumPrices
}
