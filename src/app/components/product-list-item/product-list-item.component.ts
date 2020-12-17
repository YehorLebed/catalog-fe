import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from '../../interfaces/product.interface';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {
    @Input('product') product: IProduct;

    constructor(
        private router: Router,
        private cartService: CartService
    ) {
    }

    handleNavigate() {
        this.router.navigateByUrl(`/products/${this.product.id}`);
    }

    handleAddProductToCart(product: IProduct) {
        this.cartService.addProduct(product, 1);
    }

    getImageSrc() {
        return environment.url + this.product.image.medium;
    }
}
