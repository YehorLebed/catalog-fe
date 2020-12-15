import {Injectable} from '@angular/core';
import {ErrorService} from './error.service';
import {ProductApiService} from './product-api.service';
import {IPopularProducts, IProduct, IProductCatalogPageParams, IRecentlyAddedPageParams} from '../interfaces/product.interface';

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
     * get products by category id
     * @param params
     */
    public async getProductsByCategoryId(params: IProductCatalogPageParams): Promise<IProduct[]> {
        return this.fetchProductsByParameters(params);
    }

    public async getRecentlyAddedProducts(params: IRecentlyAddedPageParams): Promise<IProduct[]> {
        return this.fetchProductsByParameters(params);
    }

    public async getPopularProducts(params: IPopularProducts): Promise<IProduct[]> {
        return this.fetchProductsByParameters(params);
    }

    private async fetchProductsByParameters(params: any): Promise<IProduct[]> {
        try {
            const response = await this.productApi.fetchProductsByParameters(params);
            return response.products;
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

}
