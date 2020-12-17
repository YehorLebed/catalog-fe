import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ICartProduct} from '../interfaces/cart-product.interface';
import {IProduct} from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cartProducts = new BehaviorSubject<ICartProduct[]>([]);

    constructor() {
    }

    /**
     * subscribe on products change
     * @param cb
     */
    public subscribeOnProductsChange(cb: (cp: ICartProduct[]) => void): Subscription {
        return this.cartProducts.subscribe(cb);
    }

    /**
     * add product to cart
     * @param product
     * @param quantity
     */
    public addProduct(product: IProduct, quantity: number) {
        const cartProducts = [...this.cartProducts.value];

        const idxExists = cartProducts.findIndex(cp => cp.product.id === product.id);
        if (idxExists === -1) {
            cartProducts.push({product, quantity});
        } else {
            cartProducts[idxExists].quantity += quantity;
        }

        this.cartProducts.next(cartProducts);
    }

    /**
     * remove product from cart
     * @param productId
     * @param quantity
     */
    public removeProduct(productId: number, quantity: number) {
        let cartProducts = [...this.cartProducts.value];

        const idxExists = cartProducts.findIndex(cp => cp.product.id === productId);
        if (idxExists !== -1) {
            cartProducts[idxExists].quantity -= quantity;
            if (cartProducts[idxExists].quantity < 1) {
                // remove product from cart
                cartProducts = [
                    ...cartProducts.slice(0, idxExists),
                    ...cartProducts.slice(idxExists + 1)
                ];
            }
        }
        this.cartProducts.next(cartProducts);
    }
}
