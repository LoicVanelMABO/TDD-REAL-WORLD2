import { describe, expect, test, beforeEach } from "vitest";
import { Product, CalculatePriceUseCase } from "../app/calcul-price.usecase";

describe("CalculatePriceUseCase TESTS", () => {
  const reductionGatewayStub = {
    getReductionByCode: async () => ({ type: "FIXED", amount: 0 })
  };

  test("For no products", async () => {
    const usecase = new CalculatePriceUseCase(reductionGatewayStub);
    expect(await usecase.execute([])).toBe(0);
  });

  test("Devrait retourner le total du panier contenant un seul produit", async () => {
    const products: Product[] = [
      {
        name: "T-shirt",
        quantity: 2,
        type: "TSHIRT",
        price: 20,
      },
    ]; 
    const usecase = new CalculatePriceUseCase(reductionGatewayStub);
    expect(await usecase.execute(products)).toBe(40);
  });

  test("Devrait retourner le total du panier contenant plusieurs produits", async () => {
    const products: Product[] = [
      {
        name: "T-shirt",
        quantity: 2,
        type: "TSHIRT",
        price: 20,
      },
      {
        name: "Pull",
        quantity: 2,
        type: "PULL",
        price: 30,
      },
    ];
    const usecase = new CalculatePriceUseCase(reductionGatewayStub);
    expect(await usecase.execute(products)).toBe(100);
  });

  test("Devrait appliquer une reduction/promo fixe", async () => {    
    const products = [
      { name: "T-shirt", price: 20, quantity: 2, type: "TSHIRT"},
      { name: "Pull", price: 30, quantity: 2, type: "PULL" },
    ];

    // Stub de reductionGateway
    const reductionGatewaySub ={
      getReductionByCode: async(code: string) => ({
        type : "FIXED",
        amount : 30
      })
    };
    const usecase = new CalculatePriceUseCase(reductionGatewaySub);

    //const usecase = new CalculatePriceUseCase(reductionGateway as any);
    const total = await usecase.execute(products, "PROMO30");
    expect(total).toBe(70);
  });

  test("should not apply discount if minAmount is not reached", async () => {
    const products = [
      { name: "T-shirt", price: 20, quantity: 1, type: "TSHIRT" }
    ];

    const reductionGatewayStub = {
      getReductionByCode: async (code: string) => ({
        type: "FIXED",
        amount: 10,
        minAmount: 30
      })
    };

    const usecase = new CalculatePriceUseCase(reductionGatewayStub);

    const result = await usecase.execute(products, "PROMO10");

    expect(result).toBe(20);
  });

});