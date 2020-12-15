import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from '../../interfaces/product.interface';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {
    @Input('product') product: IProduct;

    constructor(private router: Router) {
    }

    handleNavigate() {
        this.router.navigateByUrl(`/products/${this.product.id}`);
    }

    getImageSrc() {
        return environment.url + this.product.image.medium;
    }
}
