import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {IProduct} from '../../interfaces/product.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-admin-manage-product-page',
    templateUrl: './admin-manage-product-page.component.html',
    styleUrls: ['./admin-manage-product-page.component.scss']
})
export class AdminManageProductPageComponent implements OnInit {
    public productId: number;
    public product: IProduct;
    public loading: boolean;

    constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(async params => {
            const productFromRoute = this.getProductFromRoute();
            const productId = params['productId'];

            if (productId != this.productId) {
                this.productId = productId;
            }

            if (!this.product || this.productId != this.product.id) {
                this.product = (productFromRoute && productFromRoute.id == this.productId)
                    ? productFromRoute : await this.fetchProduct(this.productId);
            }
        });
    }

    /**
     * fetch product by id
     * @param id
     */
    public fetchProduct(id: number): Promise<IProduct> {
        this.loading = true;
        return this.productService.fetchProductById(id).then(product => {
            this.loading = false;
            return product;
        });
    }

    /**
     * get product from history state
     */
    public getProductFromRoute(): IProduct {
        return history.state.productToUpdate || null;
    }

    /**
     * handle submit
     * @param product
     */
    public async handleSubmit(product: IProduct) {
        const res = !this.productId
            ? await this.productService.create(product)
            : await this.productService.update(this.product, product);

        if (res) {
            this.router.navigateByUrl(`/products/${res.id}`);
        }
    }
}
