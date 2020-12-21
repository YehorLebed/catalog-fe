import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {IProduct} from '../../interfaces/product.interface';

@Component({
    selector: 'app-admin-manage-product-page',
    templateUrl: './admin-manage-product-page.component.html',
    styleUrls: ['./admin-manage-product-page.component.scss']
})
export class AdminManageProductPageComponent implements OnInit {
    public product: IProduct;
    public loading: boolean;

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
    }

    /**
     * handle submit
     * @param product
     */
    handleSubmit(product: IProduct) {
        this.productService.create(product);
    }
}
