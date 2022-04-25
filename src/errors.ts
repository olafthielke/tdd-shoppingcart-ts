export class InvalidQuantity extends Error {
    constructor(quantity: number) {
        super(`${quantity} is not a valid quantity.`)
    }
}

export class ProductAlreadyInCart extends Error {
    constructor(productName: string) {
        super(`Product '${productName}' is already in the cart.`);
    }
}