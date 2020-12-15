import {Component, OnInit} from '@angular/core';
import {IProduct, IRecentlyAddedPageParams} from '../../interfaces/product.interface';
import {ProductService} from '../../services/product.service';

@Component({
    selector: 'app-recently-added-page',
    templateUrl: './recently-added-page.component.html',
    styleUrls: ['./recently-added-page.component.scss']
})
export class RecentlyAddedPageComponent implements OnInit {

    public loading = false;
    public isAllFetched = false;
    public params: IRecentlyAddedPageParams = { isRecentlyAdded: true, page: 0, amount: 10 };
    public products: IProduct[] = [];

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.fetchProducts();
    }

    fetchProducts() {
        this.params.page++;
        this.loading = true;
        this.productService.getRecentlyAddedProducts(this.params).then(products => {
            if(products.length < this.params.amount) {
                this.isAllFetched = true;
            }
            this.products.push(...products);
            this.loading = false;
        });
    }
}
