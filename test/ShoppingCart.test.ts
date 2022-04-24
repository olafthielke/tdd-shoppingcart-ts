import ShoppingCart from "../src/ShoppingCart";
import { InvalidQuantity } from "../src/errors";
import Product from "../src/Product";
import ShoppingCartItem from "../src/ShoppingCartItem";

const apple: Product = { name : "Apple", unitPrice: 0.35 };
const banana: Product = { name : "Banana", unitPrice: 0.75 };
const cantaloupe: Product = { name : "Cantaloupe", unitPrice: 2.50 };

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

    it("with 13 Cantaloupes, 19 Bananas and 23 Apples then have those in cart.", () => {
        const cart = new ShoppingCart();
        cart.add(cantaloupe, 13);
        cart.add(banana, 19);
        cart.add(apple, 23);

        expect(cart.items.length).toBe(3);
        verifyCartItem(cart.items[0], cantaloupe, 13);
        verifyCartItem(cart.items[1], banana, 19);
        verifyCartItem(cart.items[2], apple, 23);
        expect(cart.total).toBe(calcSubtotal(13, cantaloupe.unitPrice) + calcSubtotal(19, banana.unitPrice) + calcSubtotal(23, apple.unitPrice));
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

describe("When call cart.clear()", () => {

    it("Then can call cart.clear().", () => {
        const cart = new ShoppingCart();
        cart.clear();
    });

    it("on an empty cart Then cart will remain empty.", () => {
        const cart = new ShoppingCart();
        cart.clear();
        verifyCartIsEmpty(cart);
    });

    it("on a cart with one item Then cart will be empty.", () => {
        const cart = new ShoppingCart();
        cart.add(apple, 7);
        cart.clear();
        verifyCartIsEmpty(cart);
    });

    it("on a cart with multiple items Then cart will be empty.", () => {
        const cart = new ShoppingCart();
        cart.add(apple, 7);
        cart.add(banana, 13);
        cart.add(cantaloupe, 41);
        cart.clear();
        verifyCartIsEmpty(cart);
    });
    

    function verifyCartIsEmpty(cart: ShoppingCart) {
        expect(cart.items.length).toBe(0);
        expect(cart.total).toBe(0);
    }    
});

