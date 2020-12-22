import {Component, Input} from '@angular/core';
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
    @Input('isAdmin') isAdmin: boolean = false;

    constructor(
        private router: Router,
        private cartService: CartService,
    ) {
    }

    handleNavigate() {
        const extras = {state: {productToShow: this.product}};
        this.router.navigateByUrl(`/products/${this.product.id}`, extras);
    }

    handleAddProductToCart(product: IProduct) {
        this.cartService.addProduct(product, 1);
    }

    getImageSrc() {
        return environment.url + this.product.image.medium;
    }

    handleNavigateManage() {
        const extras = {state: {productToUpdate: this.product}};
        this.router.navigateByUrl(`/admin/products/${this.product.id}`, extras);
    }
}
