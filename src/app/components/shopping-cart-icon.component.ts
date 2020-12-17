import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CartService} from '../services/cart.service';

@Component({
    selector: 'app-shopping-cart',
    template: `
        <div class="shopping-cart" routerLink="cart">
            <span class="material-icons">shopping_cart</span>
            <span class="shopping-cart-number">{{numberOfItems}}</span>
        </div>
    `,
    styles: [`
        .shopping-cart {
            width: 24px;
            height: 24px;
            position: relative;
        }

        .shopping-cart-number {
            position: absolute;
            width: 16px;
            height: 16px;
            font-size: 12px;
            top: -7px;
            left: 13px;
            border-radius: 50%;
            background-color: tomato;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `]
})
export class ShoppingCartIconComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public numberOfItems: number;

    constructor(private cartService: CartService) {
    }

    ngOnInit() {
        this.subscription = this.cartService.subscribeOnProductsChange(cp => {
            let numberOfItems = 0;
            cp.forEach(p => numberOfItems += p.quantity);
            this.numberOfItems = numberOfItems;
        });
    };

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
