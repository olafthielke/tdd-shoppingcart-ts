import Product from "./Product";

export default class ShoppingCartItem {

    get productName() : string {
        return this.product.name;
    }

    get unitPrice(): number {
        return this.product.unitPrice;
    } 

    get subtotal(): number {
        // Fixing floating point precision.
        return this.quantity * (this.unitPrice * 100) / 100;
    }

    constructor(public readonly product: Product, 
        public quantity: number) { }
}