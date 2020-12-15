import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {IProduct, IProductCatalogPageParams} from '../../interfaces/product.interface';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-category-page.html',
    styleUrls: ['./product-category-page.scss']
})
export class ProductCategoryPage implements OnInit {

    public loading = false;
    public isAllFetched = false;
    public products: IProduct[] = [];
    public params: IProductCatalogPageParams = {amount: 10, page: 0};

    private paramsSubscription: Subscription;

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
        this.params.page++;
        this.loading = true;
        this.productService.getProductsByCategoryId(this.params).then(products => {
            if(products.length < this.params.amount) {
                this.isAllFetched = true;
            }
            this.products.push(...products);
            this.loading = false;
        });
    }

    public isShouldRenderProducts() {
        return Array.isArray(this.products);
    }
}
