import { InvalidQuantity } from "./errors";
import Product from "./Product";
import ShoppingCartItem from "./ShoppingCartItem";

export default class ShoppingCart {
    items: ShoppingCartItem[] = [];

    get total(): number {
        return this.items.reduce((sum, item) => sum + item.subtotal, 0);
    }

    public add(product: Product, quantity: number) {
        if (quantity <= 0)
            throw new InvalidQuantity(quantity);
        this.items.push(new ShoppingCartItem(product, quantity));
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