import {Component} from '@angular/core';

@Component({
    selector: 'app-single-product-page',
    templateUrl: './product-detail-page.html',
    styleUrls: ['./product-detail-page.scss']
})
export class ProductDetailPage {

    public id = 2;
    public title = 'Apple Iphone 12 Pro Max';
    public price = 13854.00;
    public image = `https://www.researchgate.net/profile/Rizwan_Usman/publication/266200280/figure/fig1/AS:392033165430784@1470479398065/Original-image-256x256_Q320.jpg`;
    public description = "Lorem lorem lorem insad asd jkbas kjdbak sjdbkjb fadsjkba kjb akjsd ajknd akjsd fkjansdk fjnka jsdfkja nkfasdk nfaksdj nfkajs kfjasd f";

}
