import ShoppingCart from "../src/ShoppingCart";
import { NegativeQuantity, ZeroQuantity } from "../src/errors";

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
        verifyZeroQuantityError(add);
    });

    it("with quantity of -1 Then throw NegativeQuantity error.", () => {
        const cart = new ShoppingCart();
        const add = () => cart.add({ }, -1);
        expect(add).toThrow(new NegativeQuantity());
        expect(add).toThrow("-1 is not a valid quantity.");
    });


    function verifyZeroQuantityError(add: () => void) {
        expect(add).toThrow(new ZeroQuantity());
        expect(add).toThrow("0 is an invalid quantity.");
    }
});