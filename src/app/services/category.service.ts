import {Injectable} from '@angular/core';
import {CategoryApi} from './category-api.service';
import {ErrorService} from './error.service';
import {NotificationService} from './notification.service';
import {ICategory} from '../interfaces/category.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private categoryApi: CategoryApi,
        private errorService: ErrorService,
        private notificationService: NotificationService,
    ) {
    }

    /**
     * get categories by parent id
     * @param id
     */
    public async getCategoriesByParentId(id: number): Promise<ICategory[]> {
        try {
            const response = await this.categoryApi.getCategoriesByParentId(id);
            return response.categories;
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

    /**
     * get category by id
     * @param id
     */
    public async getCategoryById(id: number): Promise<ICategory> {
        try {
            return await this.categoryApi.getCategoryById(id);
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

    async create(category: ICategory) {
        try {
            return await this.categoryApi.create(category);
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }


    async update(id: number, category: ICategory) {
        category.id = id;
        try {
            return await this.categoryApi.update(category);
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }
}
