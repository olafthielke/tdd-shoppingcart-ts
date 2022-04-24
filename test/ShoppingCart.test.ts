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
        cart.add({ name : "Apple", unitPrice: 0.35 }, 3);
        verifyCartHas3Apples(cart);
        expect(cart.total).toBe(1.05);
    });

    it("for 5 Bananas Then have 5 Bananas in cart.", () => {
        const cart = new ShoppingCart();
        cart.add({ name : "Banana", unitPrice: 0.75 }, 5);
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].name).toBe("Banana");
        expect(cart.items[0].unitPrice).toBe(0.75);
        expect(cart.items[0].quantity).toBe(5);
    });


    function verifyInvalidQuantityError(add: () => void, quantity: number) {
        expect(add).toThrow(InvalidQuantity);
        expect(add).toThrow(`${quantity} is not a valid quantity.`);
    }

    function verifyCartHas3Apples(cart: ShoppingCart) {
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].name).toBe("Apple");
        expect(cart.items[0].unitPrice).toBe(0.35);
        expect(cart.items[0].quantity).toBe(3);
    }
});
