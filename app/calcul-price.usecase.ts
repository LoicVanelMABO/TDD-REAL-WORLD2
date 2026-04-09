export type ProductsType = "TSHIRT" | "PULL";

export type Product = {
  name: string;
  quantity: number;
  type: ProductsType;
  price: number;
};

export type Discount = {
  type: string;
};

export function CalculatePriceUseCase(products: Product[]): number {
  if (products.length === 0) {
    return 0;
  }
}