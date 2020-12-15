import {Injectable} from '@angular/core';
import {ErrorService} from './error.service';
import {ProductApiService} from './product-api.service';
import {NotificationService} from './notification.service';
import {IProduct, IProductQueryParams} from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private errorService: ErrorService,
        private productApi: ProductApiService,
        private notificationService: NotificationService
    ) {
    }

    /**
     * get products by category id
     * @param parameters
     */
    public async getProductsByCategoryId(parameters: IProductQueryParams): Promise<IProduct[]> {
        try {
            const response = await this.productApi.getProductsByCategoryId(parameters);
            return response.products;
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

}
