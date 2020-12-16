import {Component} from '@angular/core';
import {IProductQueryParameters} from '../../interfaces/product.interface';


@Component({
    selector: 'app-recently-added-page',
    templateUrl: './recently-added-page.component.html',
    styleUrls: ['./recently-added-page.component.scss']
})
export class RecentlyAddedPageComponent {

    public params: IProductQueryParameters = {
        isRecentlyAdded: true,
        page: 0,
        amount: 10
    };

    constructor() {
    }
}
