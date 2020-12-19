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

    /**
     * fetch products from server
     * @param params
     */
    public async fetchProductsByParameters(params: IProductQueryParameters): Promise<IProduct[]> {
        try {
            const response = await this.productApi.fetchProductsByParameters(params);
            return response.products;
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

    /**
     * fetch product from server
     * @param id
     */
    public async fetchProductById(id: number):Promise<IProduct> {
        try {
            return await this.productApi.fetchProductById(id);
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }
}
