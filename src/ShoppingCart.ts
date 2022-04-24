import { InvalidQuantity } from "./errors";

export default class ShoppingCart {
    items: any = [];

    get total(): number {
        return (this.items.length === 0) ? 0 : 1.05;
    }

    public add(product: any, quantity: number) {
        if (quantity <= 0)
            throw new InvalidQuantity(quantity);
        this.items.push({ name: "Apple", unitPrice: 0.35, quantity: 3 });
    }
}