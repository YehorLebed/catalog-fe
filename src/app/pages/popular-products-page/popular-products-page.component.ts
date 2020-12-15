import { Component, OnInit } from '@angular/core';
import {IPopularProducts, IProduct, IRecentlyAddedPageParams} from '../../interfaces/product.interface';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-popular-products-page',
  templateUrl: './popular-products-page.component.html',
  styleUrls: ['./popular-products-page.component.scss']
})
export class PopularProductsPageComponent implements OnInit {

    public loading = false;
    public isAllFetched = false;
    public params: IPopularProducts = { isPopular: true, page: 0, amount: 10 };
    public products: IProduct[] = [];

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.fetchProducts();
    }

    fetchProducts() {
        this.params.page++;
        this.loading = true;
        this.productService.getPopularProducts(this.params).then(products => {
            if(products.length < this.params.amount) {
                this.isAllFetched = true;
            }
            this.products.push(...products);
            this.loading = false;
        });
    }

}
