import Product from "./Product";

export default class ShoppingCartItems {

    get name() : string {
        return this.product.name;
    }

    get unitPrice(): number {
        return this.product.unitPrice;
    } 

    constructor(public readonly product: Product, 
        public readonly quantity: number) { }
}