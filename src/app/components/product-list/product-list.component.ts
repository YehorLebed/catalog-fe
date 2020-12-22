import {Component, Input} from '@angular/core';
import {IProduct} from '../../interfaces/product.interface';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    @Input('products') products: IProduct[] = [];

    constructor(
        private authService: AuthService
    ) {
    }



    get isAdmin(): boolean {
        return this.authService.isRole('admin');
    }

}
