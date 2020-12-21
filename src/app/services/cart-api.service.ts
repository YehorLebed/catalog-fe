import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ICart, ICartRequest} from '../interfaces/cart.interface';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {Cart} from '../classes/cart.class';

@Injectable({
    providedIn: 'root'
})
export class CartApiService {

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {
    }

    /**
     * prepare authorization headers
     * @private
     */
    private prepareAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        const authHeader = {'Authorization': 'Bearer ' + token};
        return new HttpHeaders(authHeader);
    }

    /**
     * prepare merge request url
     * @param id
     * @param type
     * @private
     */
    private prepareUrlUpdateCartByUserId(id: number, type: string): string {
        return this.prepareUrlGetCartByUserId(id) + `?type=${type}`;
    }

    /**
     * prepare url for get user cart
     * @param id
     * @private
     */
    private prepareUrlGetCartByUserId(id: number) {
        return `${environment.url}/carts/${id}`;
    }

    /**
     * fetch user cart
     * @param id
     */
    public fetchCartByUserId(id: number): Promise<ICart> {
        const url = this.prepareUrlGetCartByUserId(id);
        const headers = this.prepareAuthHeaders();
        return this.httpClient.get<ICart>(url, {headers}).toPromise();
    }

    /**
     * update cart
     * @param cart
     * @param type
     */
    public updateCart(cart: ICartRequest, type: string): Promise<boolean> {
        const userId = cart.user && cart.user.id || this.authService.getUser().id;
        const url = this.prepareUrlUpdateCartByUserId(userId, type);
        const headers = this.prepareAuthHeaders();
        return this.httpClient.put(url, cart, {observe: 'response', headers})
            .toPromise().then(response => response.status === 200);
    };

    /**
     * get saved in localstorage cart
     */
    public fetchSavedCart(): ICart {
        const exists = localStorage.getItem('cart');
        const data = exists ? JSON.parse(exists) : [];
        return new Cart(null, null, data.products);
    }

    /**
     * save cart to localstorage
     * @param cart
     */
    public updateSavedCart(cart: ICart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    public clearSavedCart() {
        localStorage.removeItem('cart');
    }
}
