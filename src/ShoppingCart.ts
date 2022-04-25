import { InvalidQuantity } from "./errors";
import Product from "./Product";
import ShoppingCartItem from "./ShoppingCartItem";

export default class ShoppingCart {
    items: ShoppingCartItem[] = [];

    get total(): number {
        return this.items.reduce((sum, item) => sum + item.subtotal, 0);
    }

    public add(product: Product, quantity: number) {
        this.validateAdd(quantity, product);

        const index = this.findItemIndex(product.name);
        if (index > -1)
            this.items[index].quantity += quantity;
        else
            this.items.push(new ShoppingCartItem(product, quantity));
    }

    private validateAdd(quantity: number, product: Product) {
        if (quantity <= 0)
            throw new InvalidQuantity(quantity);
    }

    public remove(productName: string) {
        const index = this.findItemIndex(productName);
        if (index > -1)
            this.items.splice(index, 1);
    }

    public clear() {
        this.items = [];
    }


    private findItemIndex(productName: string) {
        return this.items.findIndex(item => item.productName === productName);
    }
}