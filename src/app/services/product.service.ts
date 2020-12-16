import {Injectable} from '@angular/core';
import {ErrorService} from './error.service';
import {ProductApiService} from './product-api.service';
import {IProduct, IProductQueryParameters} from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private errorService: ErrorService,
        private productApi: ProductApiService,
    ) {
    }

    public async fetchProductsByParameters(params: IProductQueryParameters): Promise<IProduct[]> {
        try {
            const response = await this.productApi.fetchProductsByParameters(params);
            return response.products;
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

}
