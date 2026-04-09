import { describe, expect, test, beforeEach } from "vitest";
import { Product, CalculatePriceUseCase } from "../app/calcul-price.usecase";


describe("CalculatePriceUseCase TESTS", () => {
  test("For no products", async () => {
    expect(CalculatePriceUseCase([])).toBe(0);
  });
});