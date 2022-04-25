export class InvalidQuantity extends Error {
    constructor(quantity: number) {
        super(`${quantity} is not a valid quantity.`)
    }
}

export class ProductAlreadyInCart extends Error {
    constructor() {
        super("Product 'Apple' is already in the cart.");
    }
}