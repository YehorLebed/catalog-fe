import {Component, OnInit} from '@angular/core';
import {IProductQueryParameters} from '../../interfaces/product.interface';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

    public show = false;
    public params = {isRecommended: true,};

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleSidebar() {
        this.show = !this.show;
    }

}
