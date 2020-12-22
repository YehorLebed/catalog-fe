import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../interfaces/product.interface';
import {ActivatedRoute} from '@angular/router';
import {ICategory} from '../../interfaces/category.interface';
import {CategoryService} from '../../services/category.service';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-admin-manage-category',
    templateUrl: './admin-manage-category.component.html',
    styleUrls: ['./admin-manage-category.component.scss']
})
export class AdminManageCategoryComponent implements OnInit {
    public categoryId: number;
    public category: ICategory;
    public loading: boolean;

    constructor(
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationService,
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(async params => {
            if (params.categoryId != this.categoryId) {
                this.categoryId = params.categoryId;
                this.category = await this.fetchCategory(this.categoryId);
            }
        });
    }

    public fetchCategory(id: number): Promise<ICategory> {
        this.loading = true;
        return this.categoryService.getCategoryById(id).then(c => {
            this.loading = false;
            return c;
        });
    }

    /**
     * get category from history state
     */
    public getProductFromRoute(): IProduct {
        return history.state.productToUpdate || null;
    }

    /**
     * handle submit
     * @param category
     */
    public async handleSubmit(category: ICategory) {
        const res = !this.categoryId
            ? await this.categoryService.create(category)
            : await this.categoryService.update(this.categoryId, category);

        if (res) {
            const msg = !this.categoryId
                ? `Category ${category.title} was created`
                : `Category ${category.title} was updated`;
            this.notificationService.setInfoNotification(msg);
        }
    }

}
