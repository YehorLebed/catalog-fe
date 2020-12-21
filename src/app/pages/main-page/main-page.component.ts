import {Component, OnInit} from '@angular/core';
import {IProductQueryParameters} from '../../interfaces/product.interface';
import {ICategory} from '../../interfaces/category.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

    public show = false;
    public params = {isRecommended: true,};

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    /**
     * toggle show sidebar
     */
    toggleSidebar() {
        this.show = !this.show;
    }

    /**
     * redirect to products category page
     * @param category
     */
    handleCategoryClick(category: ICategory) {
        if (category.id) {
            this.router.navigateByUrl(`/categories/${category.id}`,);
        }
    }

}
