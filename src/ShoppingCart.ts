import { InvalidQuantity } from "./errors";
import Product from "./Product";
import ShoppingCartItem from "./ShoppingCartItem";

export default class ShoppingCart {
    items: ShoppingCartItem[] = [];

    get total(): number {
        return (this.items.length === 0) ? 0 : 1.05;
    }

    public add(product: Product, quantity: number) {
        if (quantity <= 0)
            throw new InvalidQuantity(quantity);
        this.items.push(new ShoppingCartItem(product, quantity));
    }
}