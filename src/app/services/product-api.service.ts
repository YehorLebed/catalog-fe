import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IProduct, IProductImage, IProductsResponse} from '../interfaces/product.interface';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ProductApiService {

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
    ) {
    }


    /**
     * prepare authorization headers
     * @private
     */
    private prepareHeaders(isFile: boolean = false): HttpHeaders {
        const token = this.authService.getToken();
        const headers = {'Authorization': 'Bearer ' + token};
        if (isFile) {
            headers['Content-Type'] = 'multipart/form-data;';
        }
        return new HttpHeaders(headers);
    }

    private prepareUrlGetById(id: number) {
        return `${environment.url}/products/${id}`;
    }

    private prepareUrlSetImage(id: number) {
        return `${environment.url}/admin/products/${id}/images`;
    }

    private prepareUrlPost() {
        return `${environment.url}/admin/products`;
    }

    private prepareUrlUsingParameters(params: any) {
        let url = `${environment.url}/products?`;
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                url += `&${key}=${params[key]}`;
            }
        }
        return url;
    }

    /**
     * get products by CategoryIdParams
     * @param parameters
     */
    public fetchProductsByParameters(parameters: any): Promise<IProductsResponse> {
        const url = this.prepareUrlUsingParameters(parameters);
        return this.httpClient.get<IProductsResponse>(url).toPromise();
    }

    /**
     * get product by id params
     * @param id
     */
    public fetchProductById(id: number) {
        const url = this.prepareUrlGetById(id);
        return this.httpClient.get<IProduct>(url).toPromise();
    }

    async createProduct(productData: IProduct): Promise<IProduct> {
        const headers = this.prepareHeaders();
        const url = this.prepareUrlPost();
        return this.httpClient.post<IProduct>(url, productData, {headers}).toPromise();
    }

    /**
     * set product
     * @param productId
     * @param image
     */
    async setProductImage(productId: number, image: Blob): Promise<IProductImage> {
        const formData = new FormData();
        formData.append('image', image);
        const headers = this.prepareHeaders();
        const url = this.prepareUrlSetImage(productId);
        return this.httpClient.post<IProductImage>(url, formData, {headers}).toPromise();
    }
}
