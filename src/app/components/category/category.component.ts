import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {ICategory} from '../../interfaces/category.interface';
import {Category} from '../../classes/category.class';
import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    @Input('category') category: ICategory;
    public subCategories: ICategory[];

    public loading = false;
    public show = false;

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        if (!this.category) {
            this.category = new Category(null, 'Categories', null);
        }
        this.onFetch();
    }

    public handleClick() {
        this.show = !this.show;
        if (!this.subCategories) {
            this.onFetch();
        }
    }

    public onFetch() {
        this.loading = true;
        this.categoryService.getCategoriesByParentId(this.category.id)
            .then(res => {
                console.log(res);
                this.subCategories = res;
                this.loading = false;
            });
    }

    isShouldRenderSubcategories() {
        return !this.loading &&
            Array.isArray(this.subCategories) &&
            this.subCategories.length > 0;
    }

    isShouldRenderNoSubcategoriesExists() {
        return !this.loading &&
            Array.isArray(this.subCategories) &&
            this.subCategories.length === 0;
    }
}
