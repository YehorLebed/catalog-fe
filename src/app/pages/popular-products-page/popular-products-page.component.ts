import { Component } from '@angular/core';
import {IProductQueryParameters} from '../../interfaces/product.interface';

@Component({
  selector: 'app-popular-products-page',
  templateUrl: './popular-products-page.component.html',
  styleUrls: ['./popular-products-page.component.scss']
})
export class PopularProductsPageComponent {

    public params = {isPopular: true};

    constructor() {
    }

}
