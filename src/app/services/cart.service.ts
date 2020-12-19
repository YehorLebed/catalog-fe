import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ICartProduct} from '../interfaces/cart-product.interface';
import {IProduct} from '../interfaces/product.interface';
import {NotificationService} from './notification.service';
import {ErrorService} from './error.service';
import {CartApiService} from './cart-api.service';
import {AuthService} from './auth.service';
import {Cart} from '../classes/cart.class';
import {ICart} from '../interfaces/cart.interface';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart = new BehaviorSubject<ICart>(
        new Cart(null, {id: null}, [],)
    );

    constructor(
        private authService: AuthService,
        private errorService: ErrorService,
        private cartApiService: CartApiService,
        private notificationService: NotificationService,
    ) {
        this.subscribeOnAuthChange();
    }

    /**
     * subscribe on user authentication change
     * @private
     */
    private subscribeOnAuthChange() {
        this.authService.subscribeOnTokenChange(async token => {
            if (!token) {
                this.loadCartData();
            } else {
                const user = this.authService.getUser();
                if (this.cart.value.products.length !== 0) {
                    await this.mergeCart(
                        new Cart(null, user, this.cart.value.products)
                    );
                }
                await this.fetchCartByUserId(user.id);
            }
        });
    }

    /**
     * fetch user cart
     * @param id
     * @private
     */
    private async fetchCartByUserId(id: number) {
        try {
            const cart = await this.cartApiService.fetchCartByUserId(id);
            this.cart.next(cart);
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

    /**
     * update cart
     * @param cart
     */
    public async updateCart(cart: ICart) {
        try {
            const cartRequest = Cart.prepareRequestData(cart);
            const isUpdated = await this.cartApiService.updateCart(cartRequest);
            if (!isUpdated) {
                const msg = 'Failed to update your cart';
                this.notificationService.setErrorNotification(msg);
            }
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

    /**
     * merge cart
     * @private
     * @param cart
     */
    private async mergeCart(cart: ICart) {
        try {
            const cartRequest = Cart.prepareRequestData(cart);
            const isMerged = await this.cartApiService.updateCart(cartRequest, true);
            if (!isMerged) {
                const msg = 'Failed to merge your cart';
                this.notificationService.setErrorNotification(msg);
            } else {
                localStorage.removeItem('cart');
                const msg = 'Your cart was merged successfully';
                this.notificationService.setInfoNotification(msg);
            }
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

    /**
     * load cart data
     */
    public loadCartData() {
        const user = this.authService.getUser();
        if (!user) {
            this.loadSavedDataFromLocalStorage();
        } else {
            this.fetchCartByUserId(user.id);
        }
    }

    /**
     * load cart data from localstorage
     */
    public loadSavedDataFromLocalStorage() {
        const savedCartDataJson = localStorage.getItem('cart');
        if (savedCartDataJson) {
            try {
                const savedCartData = JSON.parse(savedCartDataJson);
                this.cart.next({...this.cart.value, products: savedCartData});
            } catch (error) {
                const msg = 'Failed to load cart from storage';
                this.notificationService.setErrorNotification(msg);
            }
        }
    }

    /**
     * save data to local storage and to behavior subject
     */
    public save(cart: ICart) {
        this.cart.next(cart);
        const user = this.authService.getUser();
        if (!user) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            this.updateCart(cart);
        }
    }

    /**
     * subscribe on products change
     * @param cb
     */
    public subscribeOnProductsChange(cb: (cp: ICartProduct[]) => void): Subscription {
        return this.cart.subscribe(cart => cb(cart.products));
    }

    /**
     * add product to cart
     * @param product
     * @param quantity
     */
    public addProduct(product: IProduct, quantity: number) {
        const cartProducts = [...this.cart.value.products];

        const idxExists = cartProducts.findIndex(cp => cp.product.id === product.id);
        if (idxExists === -1) {
            cartProducts.push({product, quantity});
        } else {
            cartProducts[idxExists].quantity += quantity;
        }
        this.save({...this.cart.value, products: cartProducts});
    }

    /**
     * remove product from cart
     * @param productId
     * @param quantity
     */
    public removeProduct(productId: number, quantity: number) {
        let cartProducts = [...this.cart.value.products];

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
        this.save({...this.cart.value, products: cartProducts});
    }
}
