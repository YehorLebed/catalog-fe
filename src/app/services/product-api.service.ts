import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IProductsResponse} from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductApiService {

    constructor(private httpClient: HttpClient) {
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
}
