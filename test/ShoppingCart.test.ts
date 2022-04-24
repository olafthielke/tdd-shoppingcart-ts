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

    const apple: Product = { name : "Apple", unitPrice: 0.35 };
    const banana: Product = { name : "Banana", unitPrice: 0.75 };

    it.each([
        [0],
        [-1], 
        [-3],
        [-10]
        ])
        (`with quantity of %i Then throw InvalidQuantity error.`, 
        (quantity) => {
            const cart = new ShoppingCart();
            const add = () => cart.add(apple, quantity);
            verifyInvalidQuantityError(add, quantity);    
        }
    );

    it.each([
        [3, "apple", 0.35], 
        [5, "banana", 0.75],
        [11, "cantaloupe", 2.50]
        ])
        (`for %i %ss Then will have this in cart.`, 
        (quantity, productName, unitPrice) => {
            const cart = new ShoppingCart();
            const product = new Product(productName, unitPrice); 
            cart.add(product, quantity);
            expect(cart.items.length).toBe(1);
            verifyCartItem(cart.items[0], product, quantity);
            expect(cart.total).toBe(calcSubtotal(quantity, unitPrice));
    });

    
    function calcSubtotal(quantity: number, unitPrice: number) {
        return (unitPrice * 100) * quantity / 100;
    }

    function verifyInvalidQuantityError(add: () => void, quantity: number) {
        expect(add).toThrow(InvalidQuantity);
        expect(add).toThrow(`${quantity} is not a valid quantity.`);
    }

    function verifyCartItem(item: ShoppingCartItem, product: Product, quantity: number) {
        expect(item.productName).toBe(product.name);
        expect(item.unitPrice).toBe(product.unitPrice);
        expect(item.quantity).toBe(quantity);
    }
});
