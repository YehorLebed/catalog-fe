import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICategory} from '../../interfaces/category.interface';
import {Category} from '../../classes/category.class';
import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    @Output('onClick') onClick = new EventEmitter<ICategory>();
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
            this.onClick.emit(this.category);
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
