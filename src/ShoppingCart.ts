import { NegativeQuantity, ZeroQuantity } from "./errors";

export default class ShoppingCart {
    items: any = [];
    total: number = 0;

    public add(product: any, quantity: number) {
        if (quantity === 0) {
            throw new ZeroQuantity();
        }
        throw new NegativeQuantity(quantity);
    }
}