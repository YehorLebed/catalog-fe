import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ICartProduct} from '../interfaces/cart-product.interface';
import {IProduct} from '../interfaces/product.interface';
import {NotificationService} from './notification.service';
import {ErrorService} from './error.service';
import {CartApiService} from './cart-api.service';
import {AuthService} from './auth.service';
import {Cart} from '../classes/cart.class';
import {ICart, ICartRequest} from '../interfaces/cart.interface';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public loading = new BehaviorSubject<boolean>(false);
    private cart = new BehaviorSubject<ICart>(new Cart());

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
                this.cart.next(this.fetchSavedCart());
            } else {
                const user = this.authService.getUser();
                if (this.cart.value.products.length !== 0) {
                    await this.updateCart(Cart.prepareRequestData(this.cart.value), 'merge');
                }
                this.cart.next(await this.fetchCartByUserId(user.id));
            }
        });
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
    public async addProduct(product: IProduct, quantity: number) {
        const cartProducts = [...this.cart.value.products];

        if (this.authService.getUser()) {
            const productToAdd = {id: product.id, quantity};
            await this.updateCart({products: [productToAdd]}, 'add');
        } else {
            this.updateSavedCart({products: cartProducts});
        }

        const idxExists = cartProducts.findIndex(cp => cp.product.id === product.id);
        if (idxExists === -1) {
            cartProducts.push({product, quantity});
        } else {
            cartProducts[idxExists].quantity += quantity;
        }

        this.cart.next({...this.cart, products: cartProducts});
    }

    /**
     * remove product from cart
     * @param productId
     * @param quantity
     */
    public async removeProduct(productId: number, quantity: number) {
        let cartProducts = [...this.cart.value.products];

        if (this.authService.getUser()) {
            const productToRemove = {id: productId, quantity};
            await this.updateCart({products: [productToRemove]}, 'remove');
        } else {
            this.updateSavedCart({products: cartProducts});
        }

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

        this.cart.next({...this.cart, products: cartProducts});
    }


    /**
     * fetch user cart
     * @param id
     * @private
     */
    private async fetchCartByUserId(id: number): Promise<ICart> {
        this.loading.next(true);
        try {
            const cart = await this.cartApiService.fetchCartByUserId(id);
            return cart ? cart : new Cart();
        } catch (error) {
            this.errorService.processErrorResponse(error);
        } finally {
            this.loading.next(false);
        }
    }

    /**
     * update cart
     * @param cart
     * @param type
     */
    public async updateCart(cart: ICartRequest, type: string) {
        if (!['add', 'remove', 'merge'].includes(type)) {
            return;
        }
        this.loading.next(true);
        try {
            const isUpdated = await this.cartApiService.updateCart(cart, type);
            if (!isUpdated) {
                const msg = `Failed to update your cart, action: ${type}`;
                this.notificationService.setErrorNotification(msg);
            }
        } catch (error) {
            this.errorService.processErrorResponse(error);
        } finally {
            this.loading.next(false);
        }
    }

    /**
     * load cart data from localstorage
     */
    public fetchSavedCart(): ICart {
        try {
            const savedCart = this.cartApiService.fetchSavedCart();
            return savedCart || new Cart();
        } catch (e) {
            this.notificationService.setErrorNotification('Failed to load saved cart');
        }
    }

    /**
     * save data to local storage and to behavior subject
     */
    public updateSavedCart(cart: ICart) {
        this.cartApiService.updateSavedCart(cart);
    }
}
