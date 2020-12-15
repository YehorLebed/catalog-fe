import {Component, Input, OnInit} from '@angular/core';
import {ICategory} from '../../interfaces/category.interface';
import {Category} from '../../classes/category.class';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';

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

    constructor(
        private categoryService: CategoryService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        if (!this.category) {
            this.category = new Category(null, 'Categories', null);
        }
    }

    public handleClick() {
        this.show = !this.show;
        if (!this.subCategories) {
            this.onFetch();
        }
    }

    public handleLinkClick(event: MouseEvent) {
        event.stopPropagation();
        if (this.category.id) {
            this.router.navigateByUrl(`/categories/${this.category.id}`,);
        }
    }

    public onFetch() {
        this.loading = true;
        this.categoryService.getCategoriesByParentId(this.category.id)
            .then(res => {
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
