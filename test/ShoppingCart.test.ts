import ShoppingCart from "../src/ShoppingCart";
import { InvalidQuantity } from "../src/errors";
import Product from "../src/Product";
import ShoppingCartItem from "../src/ShoppingCartItem";

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
            const add = () => cart.add({ name : "Apple", unitPrice: 0.35 }, quantity);
            verifyInvalidQuantityError(add, quantity);    
        }
    );

    it("for 3 Apples Then have 3 Apples in cart.", () => {
        const cart = new ShoppingCart();
        const apple = { name : "Apple", unitPrice: 0.35 };
        cart.add(apple, 3);
        expect(cart.items.length).toBe(1);
        verifyCartItem(cart.items[0], apple, 3);
        expect(cart.total).toBe(1.05);
    });

    it("for 5 Bananas Then have 5 Bananas in cart.", () => {
        const cart = new ShoppingCart();
        const banana = { name : "Banana", unitPrice: 0.75 };
        cart.add(banana, 5);
        expect(cart.items.length).toBe(1);
        verifyCartItem(cart.items[0], banana, 5);
    });


    function verifyInvalidQuantityError(add: () => void, quantity: number) {
        expect(add).toThrow(InvalidQuantity);
        expect(add).toThrow(`${quantity} is not a valid quantity.`);
    }

    function verifyCartItem(item: ShoppingCartItem, product: Product, quantity: number) {
        expect(item.name).toBe(product.name);
        expect(item.unitPrice).toBe(product.unitPrice);
        expect(item.quantity).toBe(quantity);
    }
});
