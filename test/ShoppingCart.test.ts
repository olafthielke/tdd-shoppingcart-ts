import ShoppingCart from "../src/ShoppingCart";

describe("When construct ShoppingCart", () => {

    it("Then constructs a new cart.", () => {
        const cart = new ShoppingCart();
    });

    it("Then the cart must be empty.", () => {
        const cart = new ShoppingCart();
        expect(cart.items).toEqual([])
    });

    it("Then cart.total must be 0.", () => {
        const cart = new ShoppingCart();
        expect(cart.total).toBe(0);
    });
});