import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICart, ICartRequest} from '../interfaces/cart.interface';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartApiService {

    constructor(private httpClient: HttpClient) {
    }

    /**
     * prepare merge request url
     * @param id
     * @param isMerge
     * @private
     */
    private prepareUrlUpdateCartByUserId(id: number, isMerge: boolean = false): string {
        return isMerge
            ? this.prepareUrlGetCartByUserId(id) + '?isMerge=true'
            : this.prepareUrlGetCartByUserId(id);
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
        return this.httpClient.get<ICart>(url).toPromise();
    }

    /**
     * update cart
     * @param cart
     * @param isMerge
     */
    public updateCart(cart: ICartRequest, isMerge: boolean = false): Promise<boolean> {
        const url = this.prepareUrlUpdateCartByUserId(cart.user.id, isMerge);
        return this.httpClient.put(url, cart, {observe: 'response'})
            .toPromise().then(response => response.status === 200);
    }
}
