import { InvalidQuantity } from "./errors";

export default class ShoppingCart {
    items: any = [];
    total: number = 0;

    public add(product: any, quantity: number) {
        throw new InvalidQuantity(quantity);
    }
}