import {Component} from '@angular/core';

@Component({
    selector: 'app-shopping-cart',
    template: `
        <div class="shopping-cart">
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
export class ShoppingCartIconComponent {
    public numberOfItems = 8;

    constructor() {
    }

}
