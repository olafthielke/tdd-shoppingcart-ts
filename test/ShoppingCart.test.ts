import ShoppingCart from "../src/ShoppingCart";
import { InvalidQuantity, ProductAlreadyInCart } from "../src/errors";
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

    it("and product already exists in cart Then throw ProductAlreadyInCart error.", () => {
        const cart = new ShoppingCart();
        cart.add(apple, 7);
        const add = () => cart.add(apple, 3);
        expect(add).toThrow(ProductAlreadyInCart);
    });

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
            verifyCart(cart, [product, quantity]);
    });

    it("with 13 Cantaloupes, 19 Bananas and 23 Apples then have those in cart.", () => {
        const cart = new ShoppingCart();
        cart.add(cantaloupe, 13);
        cart.add(banana, 19);
        cart.add(apple, 23);
        verifyCart(cart, [cantaloupe, 13], [banana, 19], [apple, 23]);
    });


    function verifyInvalidQuantityError(add: () => void, quantity: number) {
        expect(add).toThrow(InvalidQuantity);
        expect(add).toThrow(`${quantity} is not a valid quantity.`);
    }
});

describe("When call cart.clear()", () => {

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
});

describe("When call cart.remove()", () => {

    it("on an empty cart, then stays an empty cart.", () => {
        const cart = new ShoppingCart();
        cart.remove("Apple");
        verifyCartIsEmpty(cart);
    });

    it("on a product that is not in the cart, then do nothing.", () => {
        const cart = new ShoppingCart();
        cart.add(apple, 6);
        cart.remove("Banana");
        verifyCart(cart, [apple, 6]);
    });

    it("on only product in the cart results in empty cart.", () => {
        const cart = new ShoppingCart();
        cart.add(apple, 6);
        cart.remove(apple.name);
        verifyCartIsEmpty(cart);
    });

    it("on one product of many in cart, Then remove only that product from cart.", () => {
        const cart = new ShoppingCart();
        cart.add(banana, 3);
        cart.add(apple, 9);
        cart.add(cantaloupe, 15);
        cart.remove(apple.name);
        verifyCart(cart, [banana, 3], [cantaloupe, 15]);
    });
});


function verifyCartIsEmpty(cart: ShoppingCart) {
    expect(cart.items.length).toBe(0);
    expect(cart.total).toBe(0);
}

function verifyCart(cart: ShoppingCart, ...items: [Product, number][]) {
    expect(cart.items.length).toBe(items.length);
    verifyCartItems(cart.items, items);
    verifyCartTotal(cart, items);
}

function verifyCartItem(actual: ShoppingCartItem, expected: [Product, number]) {
    const [product, quantity] = expected;
    expect(actual.productName).toBe(product.name);
    expect(actual.unitPrice).toBe(product.unitPrice);
    expect(actual.quantity).toBe(quantity);
}

function verifyCartItems(actual: ShoppingCartItem[], expected: [Product, number][]) {
    for (let i = 0; i < actual.length ; i++) {
        verifyCartItem(actual[i], expected[i]);
    }
}

function verifyCartTotal(cart: ShoppingCart, expected: [Product, number][]) {
    let total = 0;
    for (let i = 0; i < cart.items.length ; i++) {
        let [product, quantity] = expected[i];
        total += calcSubtotal(quantity, product.unitPrice);
    }
    expect(cart.total).toBe(total);
}

function calcSubtotal(quantity: number, unitPrice: number) {
    return (unitPrice * 100) * quantity / 100;
}
