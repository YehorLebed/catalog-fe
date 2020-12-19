import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Subscription} from 'rxjs';
import {ICartProduct} from '../../interfaces/cart-product.interface';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
    public loading = false;
    public cartProducts: ICartProduct[] = [];

    private loadingSubscription: Subscription;
    private cartProductsSubscription: Subscription;

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
        this.cartProductsSubscription = this.cartService.subscribeOnProductsChange( cp => {
            this.cartProducts = cp;
        });

        this.loadingSubscription = this.cartService.loading.subscribe(loading => {
            this.loading = loading;
        });
    }

    get total():number {
        let total = 0;
        this.cartProducts.forEach(cp => {
            total += cp.quantity * cp.product.price;
        })
        return total;
    }

    /**
     * increase product quatity by 1
     * @param cartProduct
     */
    onIncrease(cartProduct: ICartProduct) {
        this.cartService.addProduct(cartProduct.product, 1);
    }

    /**
     * decrease product quantity by 1
     * @param cartProduct
     */
    onDecrease(cartProduct: ICartProduct) {
        this.cartService.removeProduct(cartProduct.product.id, 1);
    }

    /**
     * delete product from cart
     * @param cartProduct
     */
    onDelete(cartProduct: ICartProduct) {
        this.cartService.removeProduct(cartProduct.product.id, cartProduct.quantity);
    }

    /**
     * prepare img srs
     * @param image
     */
    getImageSrc(image: string) {
        return environment.url + image;
    }
}
