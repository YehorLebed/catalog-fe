import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  @Input('products') products: IProduct[] = [];

}
