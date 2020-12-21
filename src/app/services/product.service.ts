import {Injectable} from '@angular/core';
import {ErrorService} from './error.service';
import {ProductApiService} from './product-api.service';
import {IProduct, IProductImage, IProductQueryParameters} from '../interfaces/product.interface';

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
     * create product
     * @param product
     */
    public async create(product: IProduct): Promise<IProduct> {
        try {
            const createdProduct = await this.createProduct(product);
            if (product.imageFile) {
                const createdImage = await this.setProductImage(createdProduct.id, product.imageFile);
                return {...createdProduct, image: createdImage};
            }
            return createdProduct;
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

    /**
     * create product
     * @param product
     * @private
     */
    private async createProduct(product: IProduct): Promise<IProduct> {
        const productData = {...product, image: null};
        return await this.productApi.createProduct(productData);
    }

    /**
     * set product image
     * @param productId
     * @param image
     * @private
     */
    private async setProductImage(productId: number, image: Blob): Promise<IProductImage> {
        return await this.productApi.setProductImage(productId, image);
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
    public async fetchProductById(id: number): Promise<IProduct> {
        try {
            return await this.productApi.fetchProductById(id);
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }
}
