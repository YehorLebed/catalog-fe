import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {IProduct, IProductQueryParams} from '../../interfaces/product.interface';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-category-page.html',
    styleUrls: ['./product-category-page.scss']
})
export class ProductCategoryPage implements OnInit {

    private paramsSubscription: Subscription;
    public products: IProduct[] = [];
    public loading = false;
    public params: IProductQueryParams = {amount: 10, page: 1};

    constructor(
        private activatedRoute: ActivatedRoute,
        private productService: ProductService
    ) {
    }

    ngOnInit(): void {
        this.subscribeOnRouteDataChange();
        this.fetchProducts();
    }

    private subscribeOnRouteDataChange() {
        this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
            if (params.categoryId) {
                this.params.categoryId = +params.categoryId;
            }
        });
    }

    fetchProducts() {
        this.loading = true;
        this.productService.getProductsByCategoryId(this.params).then(products => {
            this.products = products;
            this.loading = false;
        });
    }

    public isShouldRenderProducts() {
        return !this.loading && Array.isArray(this.products);
    }
}
