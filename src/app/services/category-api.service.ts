import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CategoriesResponse, ICategory} from '../interfaces/category.interface';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryApi {

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
    ) {
    }

    private getUrlPut(id: number) {
        return environment.url + `/admin/categories/${id}`;
    }

    private getUrlPost() {
        return environment.url + `/admin/categories`
    }


    /**
     * create url to fetch subcategories
     * @param id
     * @private
     */
    private getCategoriesByParentIdUrl(id: number) {
        return `${environment.url}/categories${id ? `?parentId=${id}` : ''}`;
    }

    /**
     * prepare url to get category by id
     * @param id
     * @private
     */
    private getCategoryByIdUrl(id: number) {
        return environment.url + `/categories/${id}`;
    }


    /**
     * prepare authorization headers
     * @private
     */
    private prepareHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        const headers = {'Authorization': 'Bearer ' + token};
        return new HttpHeaders(headers);
    }

    /**
     * fetch categories by parent id
     * @param id
     */
    public getCategoriesByParentId(id: number): Promise<CategoriesResponse> {
        const url = this.getCategoriesByParentIdUrl(id);
        return this.httpClient.get<CategoriesResponse>(url).toPromise();
    }

    async getCategoryById(id: number): Promise<ICategory> {
        const url = this.getCategoryByIdUrl(id);
        return this.httpClient.get<ICategory>(url).toPromise();
    }

    async create(category: ICategory): Promise<ICategory> {
        const url = this.getUrlPost();
        const headers = this.prepareHeaders();
        return this.httpClient.post<ICategory>(url, category, {headers}).toPromise();
    }

    async update(category: ICategory): Promise<ICategory> {
        const url = this.getUrlPut(category.id);
        const headers = this.prepareHeaders();
        return this.httpClient.put<ICategory>(url, category, {headers}).toPromise();
    }
}
