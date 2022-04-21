import ShoppingCart from "../src/ShoppingCart";
import { ZeroQuantity } from "../src/errors";

describe("When construct ShoppingCart", () => {

    it("Then the cart must be empty.", () => {
        const cart = new ShoppingCart();
        expect(cart.items).toEqual([])
    });

    it("Then cart.total must be 0.", () => {
        const cart = new ShoppingCart();
        expect(cart.total).toBe(0);
    });
});

describe("When call cart.add()", () => {

    it("with quantity of 0 Then throw ZeroQuantity error.", () => {
        const cart = new ShoppingCart();
        const add = () => cart.add({ }, 0);
        expect(add).toThrow(new ZeroQuantity());
        expect(add).toThrow("0 is an invalid quantity.");
    });
});