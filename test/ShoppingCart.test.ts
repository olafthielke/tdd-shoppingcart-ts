import ShoppingCart from "../src/ShoppingCart";
import { InvalidQuantity } from "../src/errors";

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

    it.each([
        [0],
        [-1], 
        [-3],
        [-10]
        ])
        (`with quantity of %i Then throw InvalidQuantity error.`, 
        (quantity) => {
            const cart = new ShoppingCart();
            const add = () => cart.add({ }, quantity);
            verifyInvalidQuantityError(add, quantity);    
        }
    );

    it("for 3 Apples Then have 3 Apples in cart.", () => {
        const cart = new ShoppingCart();
        cart.add({ name : "Apple" }, 3);
        expect(cart.items.length).toBe(1);
    });



    function verifyInvalidQuantityError(add: () => void, quantity: number) {
        expect(add).toThrow(InvalidQuantity);
        expect(add).toThrow(`${quantity} is not a valid quantity.`);
    }
});