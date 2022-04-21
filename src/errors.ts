export class ZeroQuantity extends Error {
    constructor() {
        super("0 is an invalid quantity.")
    }
}

export class NegativeQuantity extends Error {
    constructor(quantity: number) {
        super(`${quantity} is not a valid quantity.`)
    }
}