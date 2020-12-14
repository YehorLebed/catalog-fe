import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {
    public id = 2;
    public title = 'Apple Iphone 12 Pro Max';
    public price = 13854.00;
    public image = `https://www.researchgate.net/profile/Rizwan_Usman/publication/266200280/figure/fig1/AS:392033165430784@1470479398065/Original-image-256x256_Q320.jpg`
    public productPageLink = `/products/${this.id}`;
}
