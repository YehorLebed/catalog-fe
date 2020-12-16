import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {IProductQueryParameters} from '../../interfaces/product.interface';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-category-page.html',
    styleUrls: ['./product-category-page.scss']
})
export class ProductCategoryPage implements OnInit {

    public params: any = {};
    private paramsSubscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.subscribeOnRouteDataChange();
    }

    private subscribeOnRouteDataChange() {
        this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
            if (params.categoryId) {
                this.params.categoryId = +params.categoryId;
            }
        });
    }
}
