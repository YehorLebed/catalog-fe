import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-category-page.html',
    styleUrls: ['./product-category-page.scss']
})
export class ProductCategoryPage implements OnInit {

    private activatedRouteSubscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.subscribeOnRouteDataChange();
    }

    private subscribeOnRouteDataChange() {
        this.activatedRouteSubscription = this.activatedRoute.data.subscribe(data => {
            console.log(data);
        });
    }

}
