import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CategoriesResponse} from '../interfaces/category.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoryApi {

    /**
     * create url to fetch subcategories
     * @param id
     * @private
     */
    private getCategoriesByParentIdUrl(id: number) {
        return `${environment.url}/categories${id ? `?parentId=${id}` : ''}`;
    }

    constructor(private httpClient: HttpClient) {
    }

    /**
     * fetch categories by parent id
     * @param id
     */
    public getCategoriesByParentId(id: number): Promise<CategoriesResponse> {
        const url = this.getCategoriesByParentIdUrl(id);
        return this.httpClient.get<CategoriesResponse>(url).toPromise();
    }
}
