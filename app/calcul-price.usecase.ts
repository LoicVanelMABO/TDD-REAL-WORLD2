import { Switch } from "frontend/src/components/ui/switch";
import { ReductionGateway } from "./reduction.gateway";

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


export interface ReductionGateway {
  getReductionByCode(code: string): Promise<{
    type: string;
    amount: number;
    minAmount?: number;
    productType?: ProductsType;
  }>;
}

export class CalculatePriceUseCase {
  constructor(private reductionGateway: ReductionGateway) {}

  async execute(products: Product[], code?: string): Promise<number> {
    const total = products.reduce((price, product) => {
      return price + product.price * product.quantity;
    }, 0);

    if (!code) return total;

    const reduction = await this.reductionGateway.getReductionByCode(code);

    if (reduction.minAmount && total < reduction.minAmount) {
      return total;
    }

    switch (reduction.type) {
      case "FIXED" :{ 
        return Math.max(total - reduction.amount, 0);
      }
      case "PERCENTAGE" : {
        
        if (reduction.productType) {
          const targetSubtotal = products
            .filter(p => p.type === reduction.productType)
            .reduce((sum, p) => sum + p.price * p.quantity, 0);

          const discount = targetSubtotal * (reduction.amount / 100);

          return total - discount;
        }

        return total * (1 - reduction.amount / 100);
      }
    }
    return total;
  }
}