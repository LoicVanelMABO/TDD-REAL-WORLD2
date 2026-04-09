import { describe, expect, test, beforeEach } from "vitest";
import { Product, CalculatePriceUseCase } from "../app/calcul-price.usecase";


describe("CalculatePriceUseCase TESTS", () => {
  test("For no products", async () => {
    expect(CalculatePriceUseCase([])).toBe(0);
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
    expect(CalculatePriceUseCase(products)).toBe(40);
  });

  test("Devrait retourner le total du panier contenant plusieurs produits", () => {
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
    expect(CalculatePriceUseCase(products)).toBe(100);
  });

});